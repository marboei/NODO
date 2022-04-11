import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    i: 0
}
export const uselessSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setI: (state, action) => {
            state.i = action.payload
        }
    }
})

export const { setI } = uselessSlice.actions;