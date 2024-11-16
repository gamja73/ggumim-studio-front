const AUTH_URL = "127.0.0.1:7788/api/v1/auth";
const API_URL = "127.0.0.1:7788/api/v1";

// HTTP 메서드 타입을 Enum으로 정의
const HttpMethod = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
});

// 쿠키에서 JWT 토큰 가져오는 함수
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2)
    {
        return parts.pop().split(';').shift();
    }

    return null;
};

// 쿠키에서 엑세스 토큰과 리프레시 토큰을 가져오는 함수
const getAuthTokens = () => {
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');
    return { accessToken, refreshToken };
};

// API 호출 함수 (콜백을 사용하여 성공/실패 처리)
const apiRequest = async (method, url, data = null, successCallback, failCallback, isFile = false) => {
    const { accessToken, refreshToken } = getAuthTokens();

    // Axios 요청 설정
    const config = {
        method: method,
        url: API_URL + url
    };

    if (isFile)
    {
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,  // 액세스 토큰을 헤더에 포함
            'Content-Type': "multipart/form-data",
        }
    }
    else
    {
        config.headers = {
            'Authorization': `Bearer ${accessToken}`,  // 액세스 토큰을 헤더에 포함
            'Content-Type': "application/json",
        }
    }

    if (method === HttpMethod.POST || method === HttpMethod.PUT)
    {
        config.data = data;
    }

    try
    {
        // 요청을 보내고 응답을 받음
        const response = await axios(config);

        // successCallback 호출
        if (successCallback) {
            successCallback(response.data);
        }
    }
    catch (error) {
        console.error('API 요청 오류:', error);

        // 오류가 401 Unauthorized인 경우 리프레시 토큰을 사용해서 액세스 토큰을 갱신 시도
        if (error.response && error.response.status === 401)
        {
            // 리프레시 토큰을 사용하여 액세스 토큰을 갱신하는 함수 호출
            const newAccessToken = await refreshAccessToken(refreshToken);

            // 새 액세스 토큰으로 다시 요청을 시도
            if (newAccessToken)
            {
                const retryConfig = { ...config, headers: { 'Authorization': `Bearer ${newAccessToken}` }};
                const retryResponse = await axios(retryConfig);

                // 성공 콜백 호출
                if (successCallback)
                {
                    successCallback(retryResponse.data);
                }
            }
        }

        // 실패 콜백 호출
        if (failCallback)
        {
            failCallback(error);
        }
    }
};

// 리프레시 토큰을 사용하여 액세스 토큰을 갱신하는 함수
const refreshAccessToken = async (refreshToken) => {
    try
    {
        const response = await axios.post(AUTH_URL + '/refresh', { refreshToken });
        const newAccessToken = response.data.access_token;

        // 새 액세스 토큰을 쿠키에 저장
        document.cookie = `access_token=${newAccessToken}; path=/;`;

        return newAccessToken;
    }
    catch (error)
    {
        console.error('리프레시 토큰으로 액세스 토큰 갱신 실패:', error);
        return null;
    }
};

const fileUpload = async (input) => {
    const file = input.files[0];

    if (!file)
    {
        alert("Please select a file first.");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    await apiRequest(
        HttpMethod.POST,
        API_URL + '/file',
        formData,
        (data) => { return data },
        (err) => { return err },
        true
    )
}