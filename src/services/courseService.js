import { courseApi } from '../api/courseApi';

export const courseService = {
    fetchCourses: async () => {
        const courses = await courseApi.getAll();
        return courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
        }));
    },

    fetchCourseById: async (id) => {
        const course = await courseApi.getById(id);
        return {
            id: course.id,
            title: course.title,
            description: course.description,
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
