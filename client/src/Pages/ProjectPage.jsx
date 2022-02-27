
import * as React from 'react';
import {Column} from "../Components/Column";
import {Fab, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../Data/agent";
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"


export const ProjectPage = () => {
    const [columns, setColumns] = useState([]);
    
    //temporary solution
    const projectId = 1
    
    
   

    useEffect(() => {
        async function fetchColumns(){
            setColumns(await agent.column.getAll(1))
        }
        fetchColumns();
    },[])
    
    const handleDeleteColumn = async (id) => {
        let newColumns = columns.filter((column) => column.id !== id)
        setColumns(newColumns)
        await agent.column.delete(projectId,id)
    }

    //updates existing task and passes the function to child component(Task) to take as a parameter the existing task id and the updated task
    const updateColumn = async (updatedColumn, id) => {
        let updatedColumns = columns
        updatedColumns.forEach((task) => {
            if (task.id === updatedColumn.id) task.title = updatedColumn.title
        })
        setColumns(updatedColumns)
        await agent.column.update(projectId,id, updatedColumn)
    }
    
    const handleAddColumn = async () => {
        const newColumn = await agent.column.add(projectId,{title: 'New column'})
        setColumns([...columns, newColumn])
    }
    
    
    
    
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                {/*renders all columns*/}
                <Grid container>
                    {columns.map(column =>  (
                        <Grid item xs={3} key={column.id}>
                            <Column column={column} handleDeleteColumn={handleDeleteColumn} updateColumn={updateColumn} projectId={projectId}/>
                        </Grid>
                    ))}
                    <Grid item xs={3} alignSelf='center'>
                        <Fab color="secondary" aria-label="add" sx={{verticalAlign: 'middle'}} onClick={handleAddColumn}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </DndProvider>
        </div>
    );
};