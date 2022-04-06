
import * as React from 'react';
import {
    Card,
    CardContent, ClickAwayListener, Collapse, Fab, Grid, IconButton,
    TextField,
    Typography
} from "@mui/material";
import {Task} from "./Task";
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDrop } from "react-dnd";
import { TransitionGroup } from 'react-transition-group';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";




export const Column = ({column, handleDeleteColumn, updateColumn , projectId}) => {
    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [columnClicked, setColumnClicked] = useState(false);
    const [updatedColumn, setUpdatedColumn] = useState(column);
    const [dropped, setDropped] = useState(false);
    const [addTaskClicked, setAddTaskClicked] = useState(false)
    const {task} = useSelector(state => state.task)
    
    const [{isOver, monitor}, drop] = useDrop(() => ({
        accept: "task",
        drop: async (item) => {
            await addTaskToColumn(item.id, item.columnId, item.title)
        }
    }))
    
    
    //fetches tasks from db according to it's column and stores them in tasks state
    useEffect(  () => {
        async function fetchProjects() {
            setTasks(await agent.task.getAll(projectId, column.id))
            setDropped(false)
            setAddTaskClicked(false)
        }
        fetchProjects()


    },[task,column.id, dropped])

    const addTaskToColumn = async (id, columnId, title) => {
        
        const addedTask = await agent.task.update(projectId, columnId, id, {title: title, columnId: column.id})
        setTasks(await agent.task.getAll(projectId, column.id))
        setDropped(true)
    }
    
    //handles task deletion
    //>passes this function to child component(Task) to take an individual task id as a parameter
    const handleDelete = async (id) => {
        let newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
        await agent.task.delete(projectId, column.id, id)
    }
    
    //creates a new task after user submits the creation form
    const handleNewTaskSubmit = async (e) => {
        e.preventDefault();
        setAddTaskClicked(false)
        const addedTask = await agent.task.add(projectId, column.id, {title: newTask})
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
        await agent.task.update(projectId, column.id, id, updatedTask)
    }

    //changes the taskClicked state to true if a task is clicked 
    const handleColumnClick = () => {
        setColumnClicked(true)
    };
    //changes taskClicked state to false if user clicks outside of card
    const handleClickAway = () => {
        setColumnClicked(false);
    };
    //handles the updated task form when submitted
    const handleColumnUpdateSubmit = async (e) => {
        e.preventDefault();
        //called from parent component(Column)
        updateColumn(updatedColumn, column.id)
        setColumnClicked(false);
       
    }
    
    const removeTaskAfterDrag = async (id, columnId) => {
        if (columnId === column.id) {
            let tasksAfterRemoved = await agent.task.getAll(projectId, column.id)
            
            setTasks(tasksAfterRemoved.filter(t => t.id !== id))
        }

    }
    
    return (
        <div >
            {/*renders tasks inside column*/}
            <Card sx={{ maxWidth: 400, margin: 4, bgcolor: '#b8b0b9'}}>
                <CardContent ref={drop} sx={{whiteSpace: 'normal' }}>
                    {
                        columnClicked ? (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <form noValidate autoComplete="off" onSubmit={handleColumnUpdateSubmit} >
                                    <TextField
                                        onChange={(e) => setUpdatedColumn({id: column.id, title: e.target.value})}
                                        value={updatedColumn.title}  id="outlined-basic" label="New task" variant="outlined" color='secondary' sx={{bgcolor: 'white'}} />
                                </form>
                            </ClickAwayListener>

                        ) : (
                        <Grid container>
                        <Grid item xs={8}>
                        <Typography variant='h6' onClick={handleColumnClick}>
                    {column.title}
                        </Typography>
                        </Grid>

                        <Grid item xs={4}>
                        <IconButton aria-label="delete" onClick={() => handleDeleteColumn(column.id)} >
                        <DeleteIcon fontSize="small"/>
                        </IconButton>
                        </Grid>
                        </Grid>
                        )
                    }
                    
                    {/*renders all tasks*/}
                    <TransitionGroup sx={{margin: '0px'}}>
                        {tasks.map(task => (
                            <Collapse key={task.id} {...({timeout: 800})}>
                                <Task key={task.id} task={task} handleDelete={handleDelete} updateTask={updateTask} removeTaskAfterDrag={removeTaskAfterDrag}/>
                            </Collapse>
                            
                        ))}
                        <Collapse key={'add-button'}>
                        {
                            addTaskClicked ? (
                                <form noValidate autoComplete="off" onSubmit={handleNewTaskSubmit}>
                                    <TextField onChange={(e) => setNewTask(e.target.value)}
                                               value={newTask} id="outlined-basic" label="New task" variant="outlined" sx={{bgcolor: 'white', marginLeft: '15px', marginRight: '1rem'}}/>
                                </form>
                            ) : (
                               <></>
                            )
                        }
                        </Collapse>
                    </TransitionGroup>
                    
                    {/*renders new task form*/}
                   
                    <Box textAlign='center'>
                        {
                            addTaskClicked ? (
                                <Fab size="small" color="#8a0000" aria-label="add" sx={{marginTop: '8px'}} onClick={() => setAddTaskClicked(false)}>
                                    <CloseIcon/>
                                </Fab>
                            ) : (
                                <Fab size="small" color="secondary" aria-label="add" sx={{marginTop: '4px', backgroundColor:'#948d95'}} onClick={() => setAddTaskClicked(true)}>
                                    <AddIcon />
                                </Fab>
                            )
                        }
                        
                    </Box>
                    
                </CardContent>
            </Card>
        </div>
    );
};