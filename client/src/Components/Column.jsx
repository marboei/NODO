// @flow 
import * as React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    ClickAwayListener,
    TextField,
    Typography
} from "@mui/material";
import {Task} from "./Task";
import {useEffect, useState} from "react";
import agent from "../Data/agent";

export const Column = ({column}) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    
    
    useEffect(async () => {
        setTasks(await agent.getTasks(column.id))
    },[column.id])
    
    const handleDelete = (id) => {
        let newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
        agent.deleteTask(column.id, id)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTask) {
            console.log(newTask);
        }

        const addedTask = await agent.addTask(column.id, {title: newTask})
        setTasks([...tasks, addedTask])
        
        e.target.value = ''
        setNewTask('')
        
    }
    
    const updateTask = async (updatedTask, id) => {
        let updatedTasks = tasks
        updatedTasks.forEach((task) => {
            if (task.id === updatedTask.id) task.title = updatedTask.title
        })
        setTasks(updatedTasks)
        await agent.updateTask(column.id, id, updatedTask)
    }

    
    return (
        <div>
            <Card sx={{ maxWidth: 400, margin: 2, bgcolor: '#a8a69e' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {column.title}
                    </Typography>
                    {tasks.map(task => (
                        
                            <Task key={task.id} task={task} handleDelete={handleDelete} updateTask={updateTask} />
                                
                    ))}
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField onChange={(e) => setNewTask(e.target.value)} 
                                    value={newTask} id="outlined-basic" label="New task" variant="outlined" sx={{bgcolor: 'white'}}/>
                    </form>
                   
                </CardContent>
            </Card>
        </div>
    );
};