
import * as React from 'react';
import {
    Badge,
    Grid,
    IconButton,
    Paper,
    styled, Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {TaskDetails} from "./TaskDetails";
import {useDispatch, useSelector} from "react-redux";
import {setTask} from "../store/Slices/taskSlice";
import {useParams} from "react-router-dom";
import agent from "../Data/agent";
import {setComments} from "../store/Slices/commentsSlice";
import {setColumns} from "../store/Slices/columnsSlice";
import NotesIcon from "@mui/icons-material/Notes";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import {CardPreview} from "./CardPreview";

//styling for task card
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: "#eeedde",
    textAlign: 'left',
    lineHeight: '30px',
    margin: '0px',
    
    wordWrap: 'break-word',
    cursor: 'pointer',
   
        "&:hover": {
            border: '1px solid #545055'
        }
}));


export const Task = ({task, handleDelete, handleUpdateTask, removeTaskAfterDrag}) => {
    
    const [taskClicked, setTaskClicked] = useState(false);
    
    const [updatedTask, setUpdatedTask] = useState(task);
    
    const {projectId} = useParams()
    
    const dispatch = useDispatch();
    
    const completed = task.completed ? 'completed' : ''
    
    
    const [{monitor}, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id, columnId: task.columnId, title: task.title, order: task.order},
        collect: (monitor) => ({
            monitor: monitor
        }),
        end: (item) => {
            if(monitor.getDropResult()) removeTaskAfterDrag(item.id, item.columnId, item.order)
        }
    }))

    const [{}, drop] = useDrop(() => ({
        accept: "task",
        drop: async (item) => {
            if(item.columnId === task.columnId) {
                let draggedTask = await agent.task.getById(projectId, item.columnId, item.id)
                let droppedTask = await agent.task.getById(projectId, task.columnId, task.id)
                await agent.task.update(projectId,task.columnId, task.id, {order: draggedTask.order, columnId: draggedTask.columnId})
                await agent.task.update(projectId,item.columnId, item.id, {order: droppedTask.order, columnId: droppedTask.columnId})
                let newColumns = await agent.column.getAll(projectId)
                dispatch(setColumns(newColumns))
            }
        }
    }))
    
    //changes the taskClicked state to true if a task is clicked 
    const handleTaskClick = async () => {
        let Task = await agent.task.getById(projectId, task.columnId, task.id)
        dispatch(setTask(Task))
        let Comments = await agent.comment.getAll(projectId, task.columnId, task.id)
        dispatch(setComments(Comments))
        console.log(task)
        setTaskClicked(true)
    };
    //changes taskClicked state to false if user clicks outside of card
    const handleClickAway = () => {
        
        setTaskClicked(false);
    };
    //handles the updated task form when submitted
    const handleTaskUpdateSubmit = async (e) => {
            e.preventDefault();
            //called from parent component(Column)
            handleUpdateTask(updatedTask, task.id)
            setTaskClicked(false);
    }
    
    return (
            <div ref={drop}>
                <Item elevation={10} sx={{ margin: 1 }} ref={drag}>

                    <Grid container>
                        <Grid item xs={12}  onClick={handleTaskClick} sx={{padding: '5px', fontSize: '17px', fontWeight: '400'}}>
                            <div className={completed}>
                                {task.title}
                            </div>
                        </Grid>
                    </Grid>
                    <CardPreview task={task}/>

                    <TaskDetails handleClickAway={handleClickAway} taskClicked={taskClicked} handleDelete={handleDelete}/>
                </Item>
            </div>
            
    
                        
    );
};