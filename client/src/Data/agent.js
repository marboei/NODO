import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5001/api/'
})

const column = {
    getAll: async () => {
        const response = await api.get('projects/1/columns');
        return response.data
    },
    add: async(column) => {
        const response = await api.post('projects/1/columns', column);
        return response.data;
    },
    delete: async(columnId) => {
        const response = await api.delete(`projects/1/columns/${columnId}`);
        return response.data
    },
    update: async(columnId, column) => {
        const response = await api.put(`projects/1/columns/${columnId}`, column)
        return response.data
    }
}

const task = {
    getAll: async (columnId) => {
        const response = await api.get(`projects/1/columns/${columnId}/cards`);
        return response.data
    },
    delete: async (columnId, taskId) => {
        const response = await api.delete(`projects/1/columns/${columnId}/cards/${taskId}`);
        return response.data
    },
    add: async (columnId, task) => {
        const response = await api.post(`projects/1/columns/${columnId}/cards`, task);
        return response.data
    },
    update: async (columnId, taskId, task) => {
        const response = await api.put(`projects/1/columns/${columnId}/cards/${taskId}`, task);
        return response.data
    }
}


const agent = {
    column,
    task
}

export default agent;