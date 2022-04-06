
import * as React from 'react';
import {Column} from "../Components/Column";
import {AvatarGroup, Fab, Grid, Grow, Link, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import {useParams, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {
    addColumn,
    deleteColumn,
    setColumns,
    setCurrentProject,
    setMembers,
    updateColumn
} from "../store/Slices/columnsSlice";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../Components/Toolbar";


export const ProjectPage = () => {
    const dispatch = useDispatch();
    const {columns} = useSelector(state => state.columns)
    const {members} = useSelector(state => state.columns)
    const {currentProject} = useSelector(state => state.columns)
    const {projectId} = useParams()
    const [project, setProject] = useState({})
    let transition = 0
    

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchColumns(){
            let columnsAsync = await agent.column.getAll(projectId)
            dispatch(setColumns(columnsAsync))
            
            let membersAsync = await agent.project.getProjectUsers(projectId)
            dispatch(setMembers(membersAsync))
            
            let projectAsync = await agent.project.getById(projectId)
            setProject(projectAsync)
            
            dispatch(setCurrentProject(projectAsync))
        }
        fetchColumns();
    },[])
    
    const handleDeleteColumn = async (id) => {
        
        await agent.column.delete(projectId,id)
        dispatch(deleteColumn(id))
    }

    //updates existing task and passes the function to child component(Task) to take as a parameter the existing task id and the updated task
    const handleUpdateColumn = async (updatedColumn, id) => {
        dispatch(updateColumn(updatedColumn))
        await agent.column.update(projectId,id, updatedColumn)
    }
    
    const handleAddColumn = async () => {
        const newColumn = await agent.column.add(projectId,{title: 'New column'})
        transition = 1000
        dispatch(addColumn(newColumn))
    }
    
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                        <Typography variant="h3" align="center"  margin='30px' marginBottom='20px' letterSpacing={2}>{project.title}</Typography>
                <span className="jss3"/>
                {/*renders all columns*/}
                <Grid container sx={{
                    flexWrap: "nowrap",
                    overflowX: "auto",
                }}>
                    
                    {columns.map(column =>  (
                        /*<Grow in={true}>*/
                        <Grow
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...({timeout: transition+=500})}
                            key={column.id}
                        >
                            <Grid item lg={3} md={5} xs={8} key={column.id} sx={{minWidth: '300px'}}>
                                <Column column={column} handleDeleteColumn={handleDeleteColumn} updateColumn={handleUpdateColumn} projectId={projectId}/>
                            </Grid>
                       </Grow>
                        
                    ))}
                    <Grid item xs={2} marginTop='32px'>
                        <Button color="secondary" size="small" onClick={handleAddColumn} variant="outlined">Add Column</Button>
                    </Grid>
                </Grid>
            </DndProvider>
        </div>
    );
};