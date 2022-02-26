import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5001/api/'
})
async function getColumns() {
    const response = await api.get('projects/1/columns');
    return response.data
}


async function getTasks(columnId) {
    const response = await api.get(`projects/1/columns/${columnId}/cards`);
    return response.data
}

async function deleteTask(columnId, taskId){
    const response = await api.delete(`projects/1/columns/${columnId}/cards/${taskId}`);
    return response.data
}

async function addTask(columnId, task) {
    const response = await api.post(`projects/1/columns/${columnId}/cards`, task);
    return response.data
}

async function updateTask(columnId, taskId, task){
    const response = await api.put(`projects/1/columns/${columnId}/cards/${taskId}`, task);
    return response.data
}

const agent = {
    getColumns,
    getTasks,
    deleteTask,
    addTask,
    updateTask
}

export default agent;