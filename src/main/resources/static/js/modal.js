
// 특정 ID의 모달을 열기
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);

    if (modal)
    {
        modal.classList.add("active");
    }
}


// 특정 ID의 모달을 닫기
const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);

    if (modal)
    {
        modal.classList.remove("active");
    }
}

// 모달 외부를 클릭했을 때 닫기
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');

    modals.forEach((modal) => {
        if (e.target === modal)
        {
            modal.classList.remove("active");
        }
    });
});