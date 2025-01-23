import courseListComponent from './components/courseList.js';
import courseFormComponent from './components/courseForm.js';
import headerComponent from './components/header.js';
import footerComponent from './components/footer.js';
import coursesApi from './api/courseApi.js';
import carousel from './components/carousel.js';
import firstTimeModalComponent from './components/firstTimeModal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const headerDiv = document.getElementById('header');
    const footerDiv = document.getElementById('footer');

    headerDiv.innerHTML = headerComponent.render();
    footerDiv.innerHTML = footerComponent.render();

    carousel.init('carousel-container');

    async function loadCourses() {
        try {
            const courses = await coursesApi.getAll();
            const courseList = courseListComponent.render(courses);

            contentDiv.innerHTML = '';
            contentDiv.appendChild(courseList);

            const deleteButtons = contentDiv.querySelectorAll('.btn-delete');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', async function () {
                    const courseId = this.dataset.id;
                    await coursesApi.deleteCourse(courseId);
                    loadCourses();
                });
            });
        } catch (error) {
            console.error(error);
            contentDiv.innerHTML = '<h3>Error loading courses</h3>';
        }
    }

    const formDiv = courseFormComponent.render(async (data) => {
        try {
            await coursesApi.createCourse(data);
            loadCourses();
        } catch (error) {
            alert(error.message);
        }
    });

    contentDiv.innerHTML = '';
    contentDiv.appendChild(formDiv);

    loadCourses();

    firstTimeModalComponent.init();
});
