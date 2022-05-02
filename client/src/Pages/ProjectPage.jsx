
import * as React from 'react';
import {Column} from "../Components/Column";
import {AvatarGroup, Chip, Fab, Grid, Grow, IconButton, Link, Paper, Popover, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import {DndProvider, useDrag, useDrop} from "react-dnd";
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
import {Members} from "../Components/Members";


export const ProjectPage = () => {
    const dispatch = useDispatch();
    const {columns} = useSelector(state => state.columns)
    const {members} = useSelector(state => state.columns)
    const {currentProject} = useSelector(state => state.columns)
    const {projectId} = useParams()
    const [project, setProject] = useState({})
    const [orderCount, setOrderCount] = useState(0)
    
    
    let transition = 0
    

    const navigate = useNavigate()

    

    useEffect(async () => {

        let columnsAsync = await agent.column.getAll(projectId)
        dispatch(setColumns(columnsAsync))

        let membersAsync = await agent.project.getProjectUsers(projectId)
        dispatch(setMembers(membersAsync))

        let projectAsync = await agent.project.getById(projectId)
        setProject(projectAsync)
        
        

        dispatch(setCurrentProject(projectAsync))
        
        console.log(columns)

    },[dispatch])

    
    
    
    
    const handleDeleteColumn = async (id) => {
        /*await agent.column.delete(projectId,id)
        dispatch(deleteColumn(id))
        for (const column of columns) {
            await agent.column.update(projectId, column.id, {order: column.order})
        }*/

        const deletedColumn = await agent.column.delete(projectId, id)
        for (const column1 of columns) {
            if(column1.order > deletedColumn.order){
                await agent.column.update(projectId, column1.id, {order: column1.order - 1})
            }
        }
        dispatch(setColumns(await agent.column.getAll(projectId)))
    }

    //updates existing task and passes the function to child component(Task) to take as a parameter the existing task id and the updated task
    const handleUpdateColumn = async (updatedColumn, id) => {
        dispatch(updateColumn(updatedColumn))
        await agent.column.update(projectId,id, updatedColumn)
    }
    
    const handleAddColumn = async () => {
        setOrderCount(orderCount + 1)
        const newColumn = await agent.column.add(projectId,{title: 'New column', order: columns.length + 1})
        transition = 1000
        dispatch(addColumn(newColumn))
    }

   
   
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Typography variant="h3" align="center"  margin='30px' marginBottom='20px' letterSpacing={2}>{project.title}</Typography>
                <span className="jss3"/>
                {/*renders all columns*/}
                <Grid container marginTop={4}>
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <Members/>
                    </Grid>
                    <Grid item xs={5}/>
                </Grid>
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
                        <Button sx={{color: "#141E27"}} size="small" onClick={handleAddColumn} variant="outlined">Add Column</Button>
                    </Grid>
                </Grid>
            </DndProvider>
        </div>
    );
};