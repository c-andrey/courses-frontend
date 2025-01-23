import { httpClient } from '../utils/httpClient.js';

const BASE_URL = 'http://localhost:39531/';
const COURSES_URL = BASE_URL + 'courses';

const courseApi = {
    getAll: async (filters) => {
        const query = new URLSearchParams(filters).toString();
        return await httpClient.get(`${COURSES_URL}?${query}`);
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
