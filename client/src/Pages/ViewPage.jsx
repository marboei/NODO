
import * as React from 'react';
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import {
    Breadcrumbs,
    Card,
    CardContent,
    CardMedia, Chip, emphasize,
    Fab,
    Grid,
    IconButton,
    Link,
    styled,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addProject, deleteProject, setProjects} from "../store/Slices/projectsSlice";
import {setCurrentProject} from "../store/Slices/columnsSlice";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    
    return {
       
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: '#eeedde'
    };
});

export const ViewPage = () => {
    const dispatch = useDispatch()
    const {projects} = useSelector(state => state.projects)
    const {currentProject} = useSelector(state => state.columns)
    const [assignedTasks, setAssignedTasks] = useState([])
    const {user} = useSelector(state => state.user)
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
            let assignedTasks = await agent.task.getAssignedCards(user.id)
            setAssignedTasks(assignedTasks)
        }
        fetchProjects();
    }, [user])
    
    

    const handleDeleteProject = async (id) => {
        await agent.project.delete(id)
        dispatch(deleteProject(id))
    }
    
    return (
        <>
            <Typography variant="h3" align="left"  margin='50px' marginBottom='20px' letterSpacing={2}>My Projects:</Typography>
        
            <Grid container spacing={3} margin='30px'>
                {projects.map(project => (
        <Grid item xs={12} sm={8} md={3} lg={3} key={project.id}>
        <Card
            className='interactiveCard'
            sx={{ maxWidth: 345 , bgcolor: '#ddd8c4' }}
        >
            <CardContent >
                <Typography gutterBottom variant="h5" component="div" align="center" onClick={() => {
                    console.log(assignedTasks)
                    navigate(`/projects/${project.id}`)
                }}>
                    {project.title}
                </Typography>
                
            </CardContent>
            <CardMedia align="right">
                <IconButton aria-label="delete" onClick={() => handleDeleteProject(project.id)} >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </CardMedia>
            
        </Card>
        </Grid>    
    ))}
            <Grid item xs={3} >
                    <Button sx={{color: "#141E27"}} size="small" onClick={handleAddProject} variant="outlined">Add Project</Button>
            </Grid>
        </Grid>

            <Typography variant="h3" align="left"  margin='50px' marginBottom='20px' letterSpacing={2}>My Assigned Tasks:</Typography>
          
            <Grid container spacing={3} margin='30px'>
                {assignedTasks.map(task => (
                    <Grid item xs={12} sm={8} md={3} lg={3} key={task.id}>
                        <Card
                            className='interactiveCard'
                            sx={{ maxWidth: 345 , bgcolor: '#ddd8c4' }}
                        >
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div" align="left" onClick={() => {
                                    navigate(`/projects/${task.projectId}`)
                                }}>
                                    {task.title}
                                    
                                </Typography>
                                
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <StyledBreadcrumb component="a" label={task.projectTitle} />
                                        <StyledBreadcrumb component="a"  label={task.columnTitle} />
                                    </Breadcrumbs>
                                

                            </CardContent>
                            
                        </Card>
                    </Grid>
                ))}
            </Grid>    
        </>
    );
};
