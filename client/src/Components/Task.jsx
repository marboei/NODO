
import * as React from 'react';
import {ClickAwayListener, Grid, IconButton, Paper, styled, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

//styling for task card
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
}));

export const Task = ({task, handleDelete, updateTask}) => {
    
    const [taskClicked, setTaskClicked] = useState(false);
    
    const [updatedTask, setUpdatedTask] = useState(task);
    
    //changes the taskClicked state to true if a task is clicked 
    const handleTaskClick = () => {
        setTaskClicked(true)
    };
    //changes taskClicked state to false if user clicks outside of card
    const handleClickAway = () => {
        setTaskClicked(false);
    };
    //handles the updated task form when submitted
    const handleSubmit = async (e) => {
            e.preventDefault();
            //called from parent component(Column)
            updateTask(updatedTask, task.id)
            setTaskClicked(false);
    }
    
    return (
        <div>
            {
                //if task is clicked renders a form to update task, otherwise it renders the card itself
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