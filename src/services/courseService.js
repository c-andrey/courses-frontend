import courseApi from '../api/courseApi.js';

const courseService = {
    fetchCourses: async (filters = {}) => {
        const courses = await courseApi.getAll(filters);
        return courses.map((course) => ({
            id: course.id,
            name: course.name,
            description: course.description,
            image: course.image,
        }));
    },

    fetchCourseById: async (id) => {
        const course = await courseApi.getById(id);
        return {
            id: course.id,
            name: course.name,
            description: course.description,
            image: course.image,
        };
    },

    createCourse: async (course) => {
        return await courseApi.create(course);
    },

    updateCourse: async (id, course) => {
        return await courseApi.update(id, course);
    },

    deleteCourse: async (id) => {
        return await courseApi.delete(id);
    },
};

export default courseService;
