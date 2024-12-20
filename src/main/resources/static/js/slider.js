class BannerSlider {
    constructor(selector, options = {}) 
    {
        this.container = document.querySelector(selector);
        this.slides = this.container.querySelectorAll('.banner-slide');
        this.dotsContainer = this.container.querySelector('.pagination');
        this.totalSlides = this.slides.length;
        this.currentSlide = 0;

        this.autoplayInterval = options.autoplayInterval || 3000;
        this.loop = options.loop || true;

        // 초기화
        this.init();
    }

    init() 
    {
        this.setupPagination();
        this.setupArrows();
        this.startAutoplay();
        this.updateSlider();
    }

    // 슬라이드 전환 함수
    changeSlide(index) 
    {
        this.currentSlide = (index + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    // 슬라이더 업데이트 함수
    updateSlider() 
    {
        // 이미지 슬라이드 이동
        const offset = this.currentSlide * 100;
        this.container.querySelector('.banner-images').style.transform = `translateX(-${offset}%)`;

        // 페이지네이션 업데이트
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[this.currentSlide].classList.add('active');
    }

    // 자동 슬라이드 시작
    startAutoplay() 
    {
        setInterval(() => {
            if (this.loop) 
            {
                this.changeSlide(this.currentSlide + 1);
            }
        }, this.autoplayInterval);
    }

    // 페이지네이션 생성
    setupPagination() 
    {
        this.dotsContainer.innerHTML = ''; // 기존 페이지네이션 삭제
        this.dots = [];

        // 페이지네이션 버튼 추가
        for (let i = 0; i < this.totalSlides; i++) 
        {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', () => this.changeSlide(i));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }

    // 화살표 네비게이션 설정
    setupArrows() 
    {
        const leftArrow = this.container.querySelector('.left-arrow');
        const rightArrow = this.container.querySelector('.right-arrow');

        leftArrow.addEventListener('click', () => this.changeSlide(this.currentSlide - 1));
        rightArrow.addEventListener('click', () => this.changeSlide(this.currentSlide + 1));
    }
}
