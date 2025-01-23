const CourseForm = {
    render: function (onSubmit) {
        const form = document.createElement('form');

        form.classList.add('course-form');

        form.innerHTML = `
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" required>
            </div>
            <div class="form-group mt-1">
                <label for="description">Description</label>
                <textarea name="description" id="description" required></textarea>
            </div>
            <div class="form-group mt-1">
                <label for="image">Image</label>
                <input type="text" name="image" id="image" required>
            </div>
            <div class="form-group mt-1">
                <button type="submit" class="btn-submit">Submit</button>
            </div>
        `;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = form.querySelector('#name').value;
            const description = form.querySelector('#description').value;
            const image = form.querySelector('#image').value;

            const data = new FormData();

            data.append('name', name);
            data.append('description', description);
            data.append('image', image);

            onSubmit(data);
        });

        return form;
    },
};

export default CourseForm;
