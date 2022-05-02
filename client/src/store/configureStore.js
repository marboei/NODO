import {configureStore} from "@reduxjs/toolkit";
import {projectsSlice} from "./Slices/projectsSlice";
import {columnsSlice} from "./Slices/columnsSlice";
import {userSlice} from "./Slices/userSlice";
import {taskSlice} from "./Slices/taskSlice";
import {uselessSlice} from "./Slices/uselessSlice";
import {commentsSlice} from "./Slices/commentsSlice";

export const store = configureStore({
    reducer: {
        projects: projectsSlice.reducer,
        columns: columnsSlice.reducer,
        user: userSlice.reducer,
        task: taskSlice.reducer,
        comments: commentsSlice.reducer,
        useless: uselessSlice.reducer
    }
})