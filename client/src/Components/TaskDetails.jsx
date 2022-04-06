 
import * as React from 'react';
import {
    AvatarGroup,
    Backdrop, Chip,
    Container,
    Divider,
    Fade,
    FormControl,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
import CommentIcon from "@mui/icons-material/Comment";
import {Comment} from "./Comment";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import agent from "../Data/agent";
import {setTask} from "../store/Slices/taskSlice";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../Utils/stringAvatar";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    overflowWrap: 'break-word',
    width: '60%',
    height: '90%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f4f5f7',
    border: '2px solid purple',
    boxShadow: 24,
    p: 2,
};


export const TaskDetails = ({taskClicked, handleClickAway}) => {
    
    const {task} = useSelector(state=> state.task)
    const dispatch = useDispatch();
    const [newDescription, setNewDescription] = useState('')
    const [addDescriptionClicked, setAddDescriptionClicked] = useState(false) 
    const [descriptionClicked, setDescriptionClicked] = useState(false)
    const [titleClicked, setTitleClicked] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newComment, setNewComment] = useState('')
    const {projectId} = useParams()
    const {user} = useSelector(state => state.user)
    

    useEffect( () => {
        setNewDescription(task.description)
        setAddDescriptionClicked(false)
        setDescriptionClicked(false)
        setNewTitle(task.title)
        setTitleClicked(false)
    },[dispatch, task])
    
    const handleDescriptionSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = await agent.task.update(projectId, task.columnId, task.id, {description: newDescription})
        dispatch(setTask({...updatedTask, description: newDescription}))
        setAddDescriptionClicked(false)
        setDescriptionClicked(false)
    }

    const handleTitleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = await agent.task.update(projectId, task.columnId, task.id, {title: newTitle})
        dispatch(setTask({...updatedTask, title: newTitle}))
        setTitleClicked(false)
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = await agent.comment.add(projectId, task.columnId, task.id, {userId: user.id, text: newComment})
        console.log(updatedTask)
        dispatch(setTask(updatedTask))
        setNewComment('')
    }
    
    
    
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={taskClicked}
            onClose={handleClickAway}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            
            <Fade in={taskClicked}>
                
                <Box sx={modalStyle}>
                    <Box textAlign='right'>
                        <IconButton color="secondary" aria-label="upload picture" component="span" onClick={handleClickAway}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Container fixed sx={{margin: '0px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={0.7}>
                                <TitleIcon fontSize="medium"  sx={{bgcolor: '#9c27b0', border: '1px solid #9c27b0', color:'#ffffff', marginLeft:'0px', borderRadius: '5px'}}/>
                            </Grid>
                            {
                                titleClicked ? (
                                    <form noValidate autoComplete="off" onSubmit={handleTitleSubmit}>
                                        <TextField onChange={(e) => setNewTitle(e.target.value)}
                                                   value={newTitle} id="outlined-basic" label="Title" variant="outlined" color='secondary' sx={{bgcolor: 'white', marginLeft: '15px', marginRight: '1rem'}}/>
                                    </form>
                                ) : (
                                    <Grid item xs={10}>
                                        <Typography variant='h5' onClick={(() => setTitleClicked(true))}>{task.title}</Typography>
                                    </Grid>
                                )
                            }

                        </Grid>
                        <Divider sx={{paddingTop: '44px'}}/>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                
                                <Grid container spacing={2} marginTop={4}>
                                    <Grid item xs={0.7}>
                                        <NotesIcon fontSize="medium"  sx={{bgcolor: '#9c27b0', border: '1px solid #9c27b0', color:'#ffffff', borderRadius: '5px'}}/>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant='h6'>Description</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={0.7}>

                                    </Grid>
                                    {
                                        (task.description && !descriptionClicked) ? (
                                            <Grid item xs={11}>
                                                <Typography variant='h6' onClick={(() => setDescriptionClicked(true))}>{task.description}</Typography>
                                            </Grid>
                                        ) : <>
                                            {

                                                (addDescriptionClicked || descriptionClicked) ? (
                                                    <Grid item xs={11}>
                                                        <form noValidate autoComplete="off" onSubmit={handleDescriptionSubmit} style={{margin: '0px', padding:'0px'}}>
                                                            <TextField fullWidth onChange={(e) => setNewDescription(e.target.value)}
                                                                       value={newDescription} id="outlined-basic" label="Description" variant="outlined" multiline rows={5}  color='secondary' sx={{bgcolor: 'white', marginRight: '1rem', marginBottom: '5px'}}/>
                                                            <Button type="submit" color="secondary" size="small" variant="outlined" onSubmit={(() => setAddDescriptionClicked(true))}>Save</Button>
                                                        </form>
                                                    </Grid>

                                                ) : (
                                                    <Grid item xs={3} >
                                                        <Button color="secondary" size="small" variant="outlined" onClick={(() => setAddDescriptionClicked(true))}>Add Description</Button>
                                                    </Grid>
                                                )

                                            }
                                        </>
                                    }

                                </Grid>
                                <Divider sx={{paddingTop: '44px'}}/>
                                <Grid container spacing={2} marginTop={4}>
                                    <Grid item xs={0.7}>
                                        <CommentIcon fontSize="medium"  sx={{bgcolor: '#9c27b0', border: '1px solid #9c27b0', color:'#ffffff', marginLeft:'0px', borderRadius: '5px'}}/>
                                    </Grid>
                                    <Grid item xs={10} marginBottom={2}>
                                        <Typography variant='h6' >Comments</Typography>

                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                                                    key={user.id} sx={{bgcolor: `${user.firstName} ${user.lastName}`.toColor()}}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <form noValidate autoComplete="off" onSubmit={handleCommentSubmit} style={{margin: '0px', padding:'0px'}}>
                                                <TextField fullWidth onChange={(e) => setNewComment(e.target.value)}
                                                           value={newComment} id="outlined-basic" label="Comment" variant="outlined" multiline rows={2}  color='secondary' sx={{bgcolor: 'white', marginRight: '1rem', marginBottom: '5px'}}/>
                                                <Button type="submit" color="secondary" size="small" variant="outlined" onSubmit={(() => handleCommentSubmit)}>Save</Button>
                                            </form>
                                        </Grid>
                                    </Grid>
                                    {
                                        task.comments ? 
                                        task.comments.map(comment => (
                                            <Comment name={`${comment.user.firstName} ${comment.user.lastName}`} username={comment.user.userName} text={comment.text}/>
                                        )) : ('')
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={4} marginTop={4}>
                                <Typography variant='subtitle1'>Labels:</Typography>  
                                <Chip label="Clicka" variant="outlined" />
                                <Chip label="Clickabl" variant="outlined" />
                                <Chip label="Clickable" variant="outlined" />
                                <Chip label="Clickablee" variant="outlined" />
                                <Typography variant='subtitle1' marginTop={12}>Assigned To:</Typography>
                                {
                                    task.assignedTo ? (
                                        <AvatarGroup sx={{alignItems:'center'}}>
                                            {
                                                task.assignedTo.map(member => (
                                                    <Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                            key={member.id} sx={{bgcolor: `${member.firstName} ${member.lastName}`.toColor()}}/>
                                                ))
                                            }
                                        </AvatarGroup>
                                    ) : (
                                        <></>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Fade>
        </Modal>
    );
};