import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5001/api/'
})
const user = JSON.parse(localStorage.getItem('user'));
const config = {
    headers: {
        'Authorization' : `Bearer ${user ? user.token : ''}`
    }
}

const account = {
    login: async(login) => {
        const response = await api.post('account/login', login).catch((e) => console.log(e));
        if(response.status !== 401){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response;
    },
    register: async(register) => {
        var err = {}
        const response = await api.post('account/register', register)/*.catch((e) => {
            console.log(response)
            console.log(e)
            
        });*/
        console.log(response.data)
        if(response.status !== 400){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data;
    }
}

const project = {
    getAll: async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const response = await api.get(`projects/user/${user.id}`, config)
        console.log(response.data)
        return response.data
        
    },
    getProjectUsers: async(projectId) => {
        const response = await api.get(`projects/${projectId}/users`, config)
        return response.data
    },
    getById: async(projectId) => {
        const response = await api.get(`projects/${projectId}`, config)
        return response.data
    },
    add: async(project) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.post(`projects/user/${user.id}`, project, config)
        return response.data
    },
    update: async(projectId, project) => {
        const response = await api.put(`projects/${projectId}`, project, config)
        return response.data
    },
    delete: async(projectId) => {
        const response = await api.delete(`projects/${projectId}`, config)
        return response.data
    },
}

const column = {
    getAll: async(projectId) => {
        const response = await api.get(`projects/${projectId}/columns`, config);
        return response.data
    },
    
    add: async(projectId, column) => {
        const response = await api.post(`projects/${projectId}/columns`, column, config);
        return response.data;
    },
    delete: async(projectId, columnId) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}`, config);
        return response.data
    },
    update: async(projectId, columnId, column) => {
        const response = await api.put(`projects/${projectId}/columns/${columnId}`, column, config)
        return response.data
    }
}

const task = {
    getAll: async(projectId, columnId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}/cards`, config);
        return response.data
    },
    delete: async(projectId, columnId, taskId) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}/cards/${taskId}`, config);
        return response.data
    },
    add: async(projectId, columnId, task) => {
        const response = await api.post(`projects/${projectId}/columns/${columnId}/cards`, task, config);
        return response.data
    },
    update: async(projectId, columnId, taskId, task) => {
        const response = await api.put(`projects/${projectId}/columns/${columnId}/cards/${taskId}`, task, config);
        return response.data
    },
    getById: async(projectId, columnId, taskId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}/cards/${taskId}`, config);
        return response.data
    }
}


const agent = {
    account,
    project,
    column,
    task
}

export default agent;