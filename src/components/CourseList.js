const CourseList = {
    render: function (courses) {
        const courseListContainer = document.createElement('div');
        courseListContainer.classList.add('course-list');

        courses.forEach((course) => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');

            // course: name, description and image
            courseElement.innerHTML = `
                <div class="course-image">
                    <img src="${course.image}" alt="${course.name}">
                </div>
                <div class="course-name">
                    <h3>${course.name}</h3>
                </div>
                <div class="course-description">
                    <p>${course.description}</p>
                </div>
            `;

            courseListContainer.appendChild(courseElement);
        });

        return courseListContainer;
    },
};

export default CourseList;
