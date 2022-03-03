
import * as React from 'react';
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import {Card, CardContent, CardMedia, Fab, Grid, IconButton, Link, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchProjects(){
            setProjects(await agent.project.getAll())
        }
        fetchProjects();
    }, [])
    
    const handleAddProject = async () => {
        const newProject = await agent.project.add({title: "New Project"})
        setProjects([...projects, newProject])
    }

    const handleDeleteProject = async (id) => {
        let newTasks = projects.filter((project) => project.id !== id)
        setProjects(newTasks)
        await agent.project.delete(id)
    }
    
    return (
        <>
        <Typography variant="h3" align="center" marginBottom='50px'>Projects Page</Typography>
        <Grid container spacing={3} marginLeft='50px'>
    {projects.map(project => (
        <Grid item xs={4}>
        <Card
            className='interactiveCard'
            sx={{ maxWidth: 345 }}
        >
            <CardContent >
                <Typography gutterBottom variant="h5" component="div" align="center" onClick={() => {
                    navigate(`/projects/${project.id}`)
                }}>
                    {project.title}
                </Typography>
                
            </CardContent>
            <CardMedia>
                <IconButton aria-label="delete" onClick={() => handleDeleteProject(project.id)} >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </CardMedia>
            
        </Card>
        </Grid>    
    ))}
            <Grid item xs={3} alignSelf='center'>
                <Fab color="secondary" aria-label="add" sx={{verticalAlign: 'middle'}} onClick={handleAddProject}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
        </>
    );
};
