document.addEventListener("DOMContentLoaded", () =>{
    const headerUserInfo = document.querySelector(".headerUserInfo");

    if (getCookie("accessToken") != null)
    {
        headerUserInfo.querySelector(".login").classList.add("active");
    }
    else
    {
        headerUserInfo.querySelector(".notLogin").classList.add("active");
    }
})

const moveToPage = (url) => {
    location.href = url;
}