// 쿠키 조회
const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies)
    {
        const [key, value] = cookie.split("=");
        if (key === name)
        {
            return value;
        }
    }
}

// 쿠키 생성
const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/`;
}

// 쿠키 삭제
const deleteCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}