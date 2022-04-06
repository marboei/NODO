
import * as React from 'react';
import {
    Backdrop,
    ClickAwayListener, Container, Divider, Fade,
    Grid,
    IconButton, Modal,
    Paper,
    Popover,
    styled,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import { useDrag } from "react-dnd";
import TitleIcon from '@mui/icons-material/Title';
import SegmentRoundedIcon from '@mui/icons-material/SegmentRounded';
import Box from "@mui/material/Box";
import NotesIcon from '@mui/icons-material/Notes';
import CommentIcon from '@mui/icons-material/Comment';
import {Comment} from "./Comment";
import {TaskDetails} from "./TaskDetails";
import {useDispatch, useSelector} from "react-redux";
import {setTask} from "../store/Slices/taskSlice";
import {useParams} from "react-router-dom";
import agent from "../Data/agent";

//styling for task card
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
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
    
    
    const [{monitor}, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id, columnId: task.columnId, title: task.title},
        collect: (monitor) => ({
            monitor: monitor
        }),
        end: (item) => {
            if(monitor.getDropResult()) removeTaskAfterDrag(item.id, item.columnId)
        }
    }))
    
    //changes the taskClicked state to true if a task is clicked 
    const handleTaskClick = async () => {
        dispatch(setTask(await agent.task.getById(projectId, task.columnId, task.id)))
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

            <Item elevation={10} sx={{ margin: 2 }} ref={drag}>
                
                <Grid container>
                    <Grid item xs={8}  onClick={handleTaskClick} sx={{padding: '5px', fontSize: '17px', fontWeight: '400'}}>
                        <div>
                            {task.title}
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <IconButton aria-label="delete" onClick={() => handleDelete(task.id)} >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Grid>
                </Grid>

                <TaskDetails handleClickAway={handleClickAway} taskClicked={taskClicked}/>
            </Item>
    
                        
    );
};