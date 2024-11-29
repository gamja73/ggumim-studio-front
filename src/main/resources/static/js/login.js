const login = async () => {
    const id = document.getElementById("loginModalIdInput").value;
    const password = document.getElementById("loginModalPasswordInput").value;

    if (id === "")
    {
        alert("아이디를 입력해주세요.");
        return;
    }

    if (password === "")
    {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    const json = {
        id: id,
        password: SHA256(password),
    };

    await apiRequest(
        HttpMethod.POST,
        AUTH_URL + "/login",
        json,
        (res) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            location.reload();
        },
        (err) => {
            alert(err);
        }
    )
}

const logout = async () => {
    await apiRequest(
        HttpMethod.POST,
        AUTH_URL + "/logout",
        null,
        (res) => {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            alert("로그아웃 되었습니다.");
            location.reload();
        },
        (err) => {
            alert(err);
        }
    )
}