import courseService from '../services/courseService.js';

const AddCourseModal = {
    show: function (onCourseAdded) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modal.innerHTML = `
      <div class="modal-content">
        <h2>Adicionar Curso</h2>
        <form id="add-course-form">
          <label for="course-name">Nome do Curso:</label>
          <input type="text" id="course-name" required />

          <label for="course-description">Descrição:</label>
          <textarea id="course-description" required></textarea>

          <label for="course-image">Selecione uma Imagem:</label>
          <input type="file" id="course-image" accept="image/*" required />

          <div class="actions">
            <button type="submit">Adicionar</button>
            <button type="button" class="close-modal">Cancelar</button>
          </div>
        </form>
      </div>
    `;
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal
            .querySelector('#add-course-form')
            .addEventListener('submit', async (e) => {
                try {
                    e.preventDefault();
                    const name = modal.querySelector('#course-name').value;
                    const description = modal.querySelector(
                        '#course-description'
                    ).value;
                    const imageInput = modal.querySelector('#course-image');
                    const imageFile = imageInput.files[0];

                    const reader = new FileReader();
                    reader.onload = async function () {
                        const imageBase64 = reader.result;

                        const newCourse = {
                            name,
                            description,
                            image: imageBase64,
                        };

                        const createdCourse =
                            await courseService.createCourse(newCourse);

                        if (createdCourse) {
                            onCourseAdded(createdCourse);
                            document.body.removeChild(modal);
                        }
                    };

                    reader.readAsDataURL(imageFile);
                } catch (error) {
                    console.error('Erro ao adicionar o curso:', error);
                    alert('Erro ao adicionar o curso. Tente novamente.');
                }
            });

        document.body.appendChild(modal);
    },
};

export default AddCourseModal;
