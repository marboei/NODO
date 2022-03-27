import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    projects: []
}
export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        addProject: (state, action) => {
            state.projects.push(action.payload)
        },
        deleteProject: (state, action) => {
            state.projects.pop(state.projects.filter((project) => project.id === action.payload))
        }
    }
})

export const { addProject, deleteProject, setProjects } = projectsSlice.actions;