import { httpClient } from '../utils/httpClient.js';

const BASE_URL = 'http://localhost:8080/';
const COURSES_URL = BASE_URL + 'courses';

const courseApi = {
    getAll: async () => {
        return await httpClient.get(COURSES_URL);
    },

    getById: async (id) => {
        return await httpClient.get(`${COURSES_URL}/${id}`);
    },

    create: async (course) => {
        return await httpClient.post(COURSES_URL, course);
    },

    update: async (id, course) => {
        return await httpClient.put(`${COURSES_URL}/${id}`, course);
    },

    delete: async (id) => {
        return await httpClient.delete(`${COURSES_URL}/${id}`);
    },
};

export default courseApi;
