import CourseList from './components/CourseList.js';
import CourseForm from './components/CourseForm.js';
import coursesApi from './api/courseApi.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('content');
    const headerDiv = document.getElementById('header');

    headerDiv.innerHTML = '<h1>Course Manager</h1>';

    async function loadCourses() {
        try {
            const courses = await coursesApi.getAll();
            const courseList = CourseList.render(courses);

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
            console.log(courseList);
        } catch (error) {
            console.error(error);
            contentDiv.innerHTML = '<h3>Error loading courses</h3>';
        }
    }

    const formDiv = CourseForm.render(async (data) => {
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
});
