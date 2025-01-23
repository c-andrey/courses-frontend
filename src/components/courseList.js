import addCourseModalComponent from './addCourseModal.js';
import courseModalComponent from './courseModal.js';

const CourseList = {
    render: function (courses) {
        const courseListContainer = document.createElement('div');
        courseListContainer.classList.add('course-list');

        const courseListTitle = document.createElement('h2');
        courseListTitle.textContent = 'MEUS CURSOS';
        courseListTitle.classList.add('course-list-title');
        courseListContainer.appendChild(courseListTitle);

        this.refreshCourses(courseListContainer, courses);

        return courseListContainer;
    },

    refreshCourses: function (container, courses) {
        const existingCourses = container.querySelectorAll('.course-card');
        existingCourses.forEach((course) => course.remove());

        const courseGrid = document.createElement('div');
        courseGrid.classList.add('course-grid');

        courses.forEach((course) => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.dataset.id = course.id;

            courseCard.innerHTML = `
          <div class="course-card-image">
            <img src="${course.image}" alt="${course.name}">
          </div>
          <div class="course-card-body">
            <div class="course-card-header">
                <h3>${course.name}</h3>
                <span>${course.description}</span>
            </div>
            <button class="view-course-button">VER CURSO</button>
          </div>
        `;

            courseCard
                .querySelector('.view-course-button')
                .addEventListener('click', () => {
                    courseModalComponent.show(course, courseCard);
                });

            courseGrid.appendChild(courseCard);
        });

        const addCourseButton = document.createElement('div');
        addCourseButton.classList.add('add-course-button');
        addCourseButton.classList.add('course-card');
        addCourseButton.innerHTML = `
        <i class="fas fa-folder-plus"></i>
        <span>ADICIONAR</span>
        <span>CURSO</span>
        `;

        addCourseButton.addEventListener('click', () => {
            addCourseModalComponent.show((newCourse) => {
                const courseListContainer =
                    document.querySelector('.course-list');
                courses.push(newCourse);
                this.refreshCourses(courseListContainer, courses);
            });
        });

        courseGrid.appendChild(addCourseButton);

        container.appendChild(courseGrid);
    },
};

export default CourseList;
