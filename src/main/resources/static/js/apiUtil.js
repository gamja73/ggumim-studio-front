const AUTH_URL = "http://127.0.0.1:7788/api/v1/auth";
const API_URL = "http://127.0.0.1:7788/api/v1";

// HTTP 메서드 타입을 Enum으로 정의
const HttpMethod = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
});

// 쿠키에서 엑세스 토큰과 리프레시 토큰을 가져오는 함수
const getAuthTokens = () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    return { accessToken, refreshToken };
};

// API 호출 함수 (콜백을 사용하여 성공/실패 처리)
const apiRequest = async (method, url, data = null, successCallback, failCallback, isFile = false) => {
    const { accessToken, refreshToken } = getAuthTokens();

    // Axios 요청 설정
    const config = {
        method: method,
        url: url,
        withCredentials: true,
    };

    if (isFile)
    {
        config.headers = {
            'Content-Type': "multipart/form-data",
        }
    }
    else
    {
        config.headers = {
            'Content-Type': "application/json",
        }
    }

    if (accessToken != null && accessToken.length > 0)
    {
        config.headers.Authorization = `Bearer ${accessToken}`;  // 액세스 토큰을 헤더에 포함
    }

    if (method === HttpMethod.POST || method === HttpMethod.PUT)
    {
        config.data = data;
    }

    // 요청을 보내고 응답을 받음
    const response = await axios(config);

    if (response.status === 200 && response.data.statusCode === 200)
    {
        successCallback(response.data.data);
    }

    else if (response.status === 200 && response.data.statusCode >= 400)
    {
        // 오류가 401인 경우 refreshToken 으로 액세스 토큰 갱신
        if (response.status === 200 && response.data.statusCode === 401)
        {
            const newAccessToken = await refreshAccessToken(refreshToken);

            // refreshToken 으로 재발급받은 accessToken으로 재시도
            if (newAccessToken)
            {
                const retryConfig = { ...config, headers: { 'Authorization': `Bearer ${newAccessToken}`} };
                const retryResponse = await axios(retryConfig);

                if (response.status === 200 && response.data.statusCode === 200)
                {
                    successCallback(retryResponse.data.data);
                }
            }
        }

        // 실패 콜백 호출
        if (failCallback)
        {
            failCallback(response.data.data);
        }
    }
};

// 리프레시 토큰을 사용하여 액세스 토큰을 갱신하는 함수
const refreshAccessToken = async (refreshToken) => {
    try
    {
        const response = await axios.post(AUTH_URL + '/refresh', { refreshToken }, { withCredentials: true });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        if (response.data.statusCode === 200)
        {
            // 새 토큰 쿠키에 저장
            setCookie("accessToken", newAccessToken);
            setCookie("refreshToken", newRefreshToken);
        }

        return newAccessToken;
    }
    catch (error)
    {
        console.error('refresh fail : ', error);
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