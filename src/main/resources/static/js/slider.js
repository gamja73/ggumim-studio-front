const bennerInrervalTime = 5000; // 배너 업데이트 대기시간 (5000ms = 5sec)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.bannerContainer');
    const bannerList = container.querySelector('.bannerList');
    const banners = bannerList.querySelectorAll('.bannerItem');
    const paginationContainer = container.querySelector('.pagination');
    const prevButton = container.querySelector('.prevButton');
    const nextButton = container.querySelector('.nextButton');
    const totalBanners = banners.length;
    let currentIndex = 0;
    let interval;

    // 배너 리스트의 전체 너비 설정
    bannerList.style.width = `${container.clientWidth * totalBanners}px`;

    // 페이지네이션 버튼 생성
    for (let i = 0; i < totalBanners; i++) {
        const button = document.createElement('button');
        button.classList.add('pagination-button');
        button.textContent = i + 1;
        button.addEventListener('click', () => {
            currentIndex = i;
            updateUI();
        });
        paginationContainer.appendChild(button);
    }

    // 이전 및 다음 버튼 클릭 이벤트 핸들러
    const navigate = (direction) => {
        currentIndex = (currentIndex + direction + totalBanners) % totalBanners;
        updateUI();
    };

    prevButton.addEventListener('click', () => navigate(-1));
    nextButton.addEventListener('click', () => navigate(1));

    // UI 업데이트 함수
    const updateUI = () => {
        updateBannerPosition();
        updatePaginationButtons();
        clearInterval(interval);
        interval = getInterval();
    };

    // 배너 위치 업데이트
    const updateBannerPosition = () => {
        bannerList.style.marginLeft = `-${container.clientWidth * currentIndex}px`;
    };

    // 페이지네이션 버튼 활성화 상태 업데이트
    const updatePaginationButtons = () => {
        const buttons = container.querySelectorAll('.pagination button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index === currentIndex);
        });
    };

    // 배너 업데이트
    const getInterval = () => {
        return setInterval(() => {
            currentIndex = (currentIndex + 1) % totalBanners;
            updateUI();
        }, bennerInrervalTime);
    };

    interval = getInterval();
    updatePaginationButtons();
});