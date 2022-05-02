import axios from 'axios';

const api = axios.create({
    baseURL:process.env.REACT_APP_API_URL
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
    },
    getAll: async(username) => {
        const response = await api.get('account', {params: {searchTerm: username}})
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
    addUserToProject: async(projectId, userId) => {
        const response = await api.post(`projects/${projectId}/user/${userId}`,{}, config)
        return response.data
    },
    removeUserFromProject: async(projectId, userId) => {
        const response = await api.delete(`projects/${projectId}/user/${userId}`, config)
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
    getById: async(projectId, columnId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}`, config)
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
    getAssignedCards: async(userId) => {
        const response = await api.get(`user/${userId}/cards`, config);
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

const comment = {
    getAll: async(projectId, columnId, cardId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}/cards/${cardId}/comments`, config);
        return response.data
    },
    add: async(projectId, columnId, cardId, comment) => {
        const response = await api.post(`projects/${projectId}/columns/${columnId}/cards/${cardId}/comments`, comment, config);
        return response.data
    },
    delete: async(projectId, columnId, cardId, id) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}/cards/${cardId}/comments/${id}`, config);
        return response.data
    }
}

const label = {
    getAll: async(projectId, columnId, cardId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}/cards/${cardId}/labels`, config);
        return response.data
    },
    add: async(projectId, columnId, cardId, label) => {
        const response = await api.post(`projects/${projectId}/columns/${columnId}/cards/${cardId}/labels`, label, config);
        return response.data
    },
    delete: async(projectId, columnId, cardId, id) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}/cards/${cardId}/labels/${id}`, config);
        return response.data
    }
}

const assignedTo = {
    getAll: async(projectId, columnId, cardId) => {
        const response = await api.get(`projects/${projectId}/columns/${columnId}/cards/${cardId}/assignedTo`, config);
        return response.data
    },
    add: async(projectId, columnId, cardId, assignedTo) => {
        const response = await api.post(`projects/${projectId}/columns/${columnId}/cards/${cardId}/assignedTo`, assignedTo, config);
        return response.data
    },
    delete: async(projectId, columnId, cardId, id) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}/cards/${cardId}/assignedTo/${id}`, config);
        return response.data
    }
}

const like = {
    add: async(projectId, columnId, cardId, commentId, like) => {
        const response = await api.post(`projects/${projectId}/columns/${columnId}/cards/${cardId}/comments/${commentId}/likes`, like, config);
        return response.data
    },
    delete: async(projectId, columnId, cardId, commentId, userId) => {
        const response = await api.delete(`projects/${projectId}/columns/${columnId}/cards/${cardId}/comments/${commentId}/likes/${userId}`, config);
        return response.data
    }
}


const agent = {
    account,
    project,
    column,
    task,
    comment,
    label,
    assignedTo,
    like
}

export default agent;