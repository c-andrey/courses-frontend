import { httpClient } from '../utils/httpClient';

const BASE_URL = process.env.BASE_URL;
const COURSES_URL = BASE_URL + 'courses';

export const courseApi = {
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
