document.addEventListener("DOMContentLoaded", () =>{
    const headerUserInfo = document.querySelector(".auth-group");

    if (getCookie("accessToken") != null)
    {
        headerUserInfo.querySelectorAll(".login").forEach(element => {
            element.classList.add("active");
        });
    }
    else
    {
        headerUserInfo.querySelectorAll(".logout").forEach(element => {
            element.classList.add("active");
        });
    }
})

const moveToPage = (url) => {
    location.href = url;
}