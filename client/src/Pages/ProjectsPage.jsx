
import * as React from 'react';
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import {Card, CardContent, CardMedia, Fab, Grid, IconButton, Link, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchProjects(){
            setProjects(await agent.project.getAll())
            console.log(projects)
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
            <Typography variant="h3" align="center"  margin='50px' marginBottom='20px' letterSpacing={2}>Projects</Typography>
            <span className="jss3"></span>
            <Grid container spacing={3} margin='30px'>
                {projects.map(project => (
        <Grid item xs={4} key={project.id}>
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
            <Grid item xs={3} >
                    <Button color="secondary" size="small" onClick={handleAddProject} variant="outlined">Add Project</Button>
            </Grid>
        </Grid>
        </>
    );
};
