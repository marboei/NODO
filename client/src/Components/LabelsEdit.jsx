import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import agent from "../Data/agent";
import {setTask} from "../store/Slices/taskSlice";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../Utils/stringAvatar";

export default function LabelsEdit({labels}) {
    
    
    const dispatch = useDispatch()
    const {task} = useSelector(state=> state.task)
    const {projectId} = useParams()
    const [newLabel, setNewLabel] = useState('')
    const [textAreaClicked, setTextAreaClicked] = useState(false)

    useEffect(() => {
        setTextAreaClicked(false)
    }, [task, dispatch])

    const labelsText = () => {
        let text = []
        labels.forEach(label => text.push(label.text))
        return text
    }
    
    const handleLabelsSubmit = async (label) => {
        setTextAreaClicked(false)
        setNewLabel('')
        const updatedTask = await agent.label.add(projectId, task.columnId, task.id, {text:label})
        dispatch(setTask(updatedTask))
    }
    return (
        <Container sx={{width: 'auto', height: 'auto', padding: 2, bgcolor: '#eeedde'}}>
                    <form noValidate autoComplete="off" onSubmit={(e)=>{
                        e.preventDefault();
                        handleLabelsSubmit(newLabel)
                    }} style={{margin: '0px', padding:'0px'}}>
                    <TextField
                        label="Add Labels"
                        placeholder="Title"
                        onChange={(e) => setNewLabel(e.target.value)}
                        value={newLabel || ''}
                        onClick={()=>setTextAreaClicked(true)}
                    />
                    </form>
            {
                textAreaClicked ? (
                    <Box sx={{ width: '95%', maxWidth: 360, bgcolor: '#eeedde' }}>
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: '#eeedde',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                        }}
                              subheader={<li />}>
                            {
                                labels.map(label => (
                                    <ListItem sx={{padding: 0}}>
                                        <ListItemButton onClick={() => handleLabelsSubmit(label.text)}>
                                            <ListItemText primary={label.text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </Box>
                ) : (
                    <></>
                )
            }
        </Container>
        
    )
}