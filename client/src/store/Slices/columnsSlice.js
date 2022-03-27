import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    columns: [],
    members: [],
    currentProject: null
}
export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload
        },
        setMembers: (state,action) => {
            state.members = action.payload
        },       
        setColumns: (state, action) => {
            state.columns = action.payload
        },
        addColumn: (state, action) => {
            state.columns.push(action.payload)
        },
        deleteColumn: (state, action) => {
            state.columns.pop(state.columns.filter((column) => column.id === action.payload))
        },
        updateColumn: (state, action) => {
            state.columns.forEach((task) => {
                if (task.id === action.payload.id) task.title = action.payload.title
            })
        }
    }
})

export const { addColumn, deleteColumn, setColumns, updateColumn, setMembers, setCurrentProject } = columnsSlice.actions;