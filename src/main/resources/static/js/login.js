document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = loginModal.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
        login();
    });
})

const login = async () => {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

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

         },
         (err) => {
            alert(err);
         }
    )
}