const carousel = {
    render: `
    <div class="carousel">
      <button class="carousel-button prev" aria-label="Previous">&lt;</button>
      <div class="carousel-track-container">
        <ul class="carousel-track">
          <li class="carousel-slide current-slide">
            <img src="https://images.unsplash.com/photo-1504027973709-58986e840e79?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1">
          </li>
          <li class="carousel-slide">
            <img src="https://images.unsplash.com/photo-1504027973709-58986e840e79?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2">
          </li>
          <li class="carousel-slide">
            <img src="https://images.unsplash.com/photo-1504027973709-58986e840e79?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3">
          </li>
        </ul>
      </div>
      <div class="carousel-dots-container">
      <div class="carousel-dots"></div>
      </div>
      <button class="carousel-button next" aria-label="Next">&gt;</button>
    </div>
  `,

    init: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }
        container.innerHTML = carousel.render;

        const track = container.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');
        const dotsContainer = container.querySelector('.carousel-dots');

        const slideWidth = slides[0].getBoundingClientRect().width;

        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide.style.left})`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateDots = (currentDot, targetDot) => {
            currentDot.classList.remove('current-dot');
            targetDot.classList.add('current-dot');
        };

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('current-dot');
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsContainer.querySelector('.current-dot');
            const nextDot = currentDot.nextElementSibling;

            if (nextSlide) {
                moveToSlide(track, currentSlide, nextSlide);
                updateDots(currentDot, nextDot);
            }
        });

        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsContainer.querySelector('.current-dot');
            const prevDot = currentDot.previousElementSibling;

            if (prevSlide) {
                moveToSlide(track, currentSlide, prevSlide);
                updateDots(currentDot, prevDot);
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide');
                const targetSlide = slides[index];
                const currentDot = dotsContainer.querySelector('.current-dot');

                moveToSlide(track, currentSlide, targetSlide);
                updateDots(currentDot, dot);
            });
        });
    },
};

export default carousel;
