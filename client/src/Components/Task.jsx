
import * as React from 'react';
import {Box, ClickAwayListener, Grid, IconButton, Paper, styled, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import agent from "../Data/agent";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
}));

export const Task = ({task, handleDelete, updateTask, column}) => {

    const [taskClicked, setTaskClicked] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleTaskClick = () => {
        setTaskClicked(true)
    };

    const handleClickAway = () => {
        setTaskClicked(false);
    };
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            updateTask(updatedTask, task.id)
            setTaskClicked(false);
    }
    
    return (
        <div>
            {
                taskClicked ? (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                onChange={(e) => setUpdatedTask({id: task.id, title: e.target.value})}
                                value={updatedTask.title}  id="outlined-basic" label="New task" variant="outlined" sx={{bgcolor: 'white'}}/>
                        </form>
                    </ClickAwayListener>
                    
                ) : (
                    <Item elevation={16} sx={{ margin: 2 }} onClick={handleTaskClick}>
                        <Grid container>
                            <Grid item xs={8}>
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
                    </Item>
                )
            
            }
        </div>
    );
};