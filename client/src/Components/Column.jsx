
import * as React from 'react';
import {
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import {Task} from "./Task";
import {useEffect, useState} from "react";
import agent from "../Data/agent";

export const Column = ({column}) => {
    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    
    //fetches tasks from db according to it's column and stores them in tasks state
    useEffect(() => {
        async function fetchTasks(){
            setTasks(await agent.task.getAll(column.id))
        }
        fetchTasks();
    },[column.id])
    
    //handles task deletion
    //>passes this function to child component(Task) to take an individual task id as a parameter
    const handleDelete = async (id) => {
        let newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
        await agent.task.delete(column.id, id)
    }
    
    //creates a new task after user submits the creation form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTask) {
            console.log(newTask);
        }

        const addedTask = await agent.task.add(column.id, {title: newTask})
        setTasks([...tasks, addedTask])
        
        e.target.value = ''
        setNewTask('')
    }
    
    //updates existing task and passes the function to child component(Task) to take as a parameter the existing task id and the updated task
    const updateTask = async (updatedTask, id) => {
        let updatedTasks = tasks
        updatedTasks.forEach((task) => {
            if (task.id === updatedTask.id) task.title = updatedTask.title
        })
        setTasks(updatedTasks)
        await agent.task.update(column.id, id, updatedTask)
    }

    
    return (
        <div>
            {/*renders tasks inside column*/}
            <Card sx={{ maxWidth: 400, margin: 2, bgcolor: '#a8a69e' }}>
                <CardContent>
                    {/*column header*/}
                    <Typography gutterBottom variant="h5" component="div">
                        {column.title}
                    </Typography>
                    {/*renders all tasks*/}
                    {tasks.map(task => (
                            <Task key={task.id} task={task} handleDelete={handleDelete} updateTask={updateTask} />
                    ))}
                    {/*renders new task form*/}
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField onChange={(e) => setNewTask(e.target.value)} 
                                    value={newTask} id="outlined-basic" label="New task" variant="outlined" sx={{bgcolor: 'white'}}/>
                    </form>
                   
                </CardContent>
            </Card>
        </div>
    );
};