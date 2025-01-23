const FirstTimeModal = {
    init: function () {
        const hasSeenModal = localStorage.getItem('hasSeenModal');

        if (!hasSeenModal) {
            this.show();
        }
    },

    show: function () {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modal = document.createElement('div');
        modal.classList.add('first-time-modal');
        modal.innerHTML = `
            <button class="modal-close">&times;</button>
            <img src="assets/images/space.jpg" alt="Promoção" class="modal-image">
            <h2>Bem-vindo ao nosso curso!</h2>
            <p>Inscreva-se agora e aproveite as nossas ofertas exclusivas.</p>
            <button class="modal-subscribe">Inscreva-se</button>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        modal
            .querySelector('.modal-close')
            .addEventListener('click', this.close.bind(this, modalOverlay));
        modal
            .querySelector('.modal-subscribe')
            .addEventListener('click', this.subscribe.bind(this));
    },

    close: function (modalOverlay) {
        modalOverlay.remove();
        localStorage.setItem('hasSeenModal', 'true');
    },

    subscribe: function () {
        alert('Você se inscreveu com sucesso!');
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            this.close(modalOverlay);
        }
    },
};

export default FirstTimeModal;
