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
        <button class="carousel-button next" aria-label="Next">&gt;</button>
      </div>
    `,

    init: (containerId) => {
        // Insere o HTML do carrossel no container
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }
        container.innerHTML = carousel.render;

        // Funções de controle do carrossel
        const track = container.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');

        const slideWidth = slides[0].getBoundingClientRect().width;

        // Alinha os slides ao lado um do outro
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide.style.left})`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        // Clique no botão "Next"
        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;

            if (nextSlide) {
                moveToSlide(track, currentSlide, nextSlide);
            }
        });

        // Clique no botão "Previous"
        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;

            if (prevSlide) {
                moveToSlide(track, currentSlide, prevSlide);
            }
        });
    },
};

export default carousel;
