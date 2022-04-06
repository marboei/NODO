import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    task: {}
}
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: (state, action) => {
            state.task = action.payload
        }
    }
})

export const { setTask } = taskSlice.actions;