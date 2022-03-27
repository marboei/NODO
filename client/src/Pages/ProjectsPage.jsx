
import * as React from 'react';
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import {Card, CardContent, CardMedia, Fab, Grid, IconButton, Link, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addProject, deleteProject, setProjects} from "../store/Slices/projectsSlice";
import {setCurrentProject} from "../store/Slices/columnsSlice";

export const ProjectsPage = () => {
    const dispatch = useDispatch()
    const {projects} = useSelector(state => state.projects)
    const {currentProject} = useSelector(state => state.columns)
    const navigate = useNavigate()

    const handleAddProject = async () => {
        const newProject = await agent.project.add({title: "New Project"})
        console.log(newProject)
        //here i'll dispatch addProject action and add newProject
        dispatch(addProject(newProject))
        let projectsAsync = await agent.project.getAll()
        dispatch(setProjects(projectsAsync))
    }
    
    useEffect(() => {
        async function fetchProjects(){
            dispatch(setCurrentProject(null))
            let projectsAsync = await agent.project.getAll()
            dispatch(setProjects(projectsAsync))
        }
        fetchProjects();
    }, [])
    
    

    const handleDeleteProject = async (id) => {
        await agent.project.delete(id)
        dispatch(deleteProject(id))
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
