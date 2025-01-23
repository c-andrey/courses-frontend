import courseService from '../services/courseService.js';

const CourseModal = {
    show: function (course) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modal.innerHTML = `
        <div class="modal-content">
          <h2>${course.name}</h2>
          <img src="${course.image}" alt="${course.name}" />
          <p>${course.description}</p>
          <div class="modal-buttons">
            <button class="delete-course danger">Deletar</button>
            <button class="close-modal">Fechar</button>
          </div>
        </div>
      `;

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal
            .querySelector('.delete-course')
            .addEventListener('click', async () => {
                const confirmDelete = confirm(
                    'Tem certeza que deseja deletar este curso?'
                );
                if (confirmDelete) {
                    try {
                        await courseService.delete(course.id);
                        alert('Curso deletado com sucesso!');
                        document.body.removeChild(modal);
                    } catch (error) {
                        console.error('Erro ao deletar o curso:', error);
                        alert('Erro ao deletar o curso. Tente novamente.');
                    }
                }
            });

        document.body.appendChild(modal);
    },
};

export default CourseModal;
