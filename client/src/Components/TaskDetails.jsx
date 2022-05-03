 
import * as React from 'react';
import {
    AvatarGroup,
    Backdrop, Chip,
    Container,
    Divider,
    Fade,
    FormControl,
    Grid,
    IconButton, Link,
    Modal, Popover,
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
import AddIcon from "@mui/icons-material/Add";
import {SearchMembers} from "./SearchMembers";
import Tooltip from '@mui/material/Tooltip';
import RemoveIcon from "@mui/icons-material/Remove";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import LabelsEdit from "./LabelsEdit";
import {setComments} from "../store/Slices/commentsSlice";
import {setColumns} from "../store/Slices/columnsSlice";
import {alpha, styled} from "@mui/material/styles";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    overflowWrap: 'break-word',
    width: '70%',
    height: '90%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ddd8c4',
    border: '2px solid purple',
    boxShadow: 24,
    p: 2,
};




export const TaskDetails = ({taskClicked, handleClickAway, handleDelete}) => {
    
    const {task} = useSelector(state=> state.task)
    const {comments} = useSelector(state => state.comments)
    const dispatch = useDispatch();
    const [newDescription, setNewDescription] = useState('')
    const [addDescriptionClicked, setAddDescriptionClicked] = useState(false) 
    const [descriptionClicked, setDescriptionClicked] = useState(false)
    const [titleClicked, setTitleClicked] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newComment, setNewComment] = useState('')
    const [assignedToClicked, setAssignedToClicked] = useState(false)
    const {projectId} = useParams()
    const {user} = useSelector(state => state.user)
    

    useEffect( () => {
        setNewDescription(task.description)
        setAddDescriptionClicked(false)
        setDescriptionClicked(false)
        setNewTitle(task.title)
        setTitleClicked(false)
        console.log(task)
    },[dispatch, task, comments])
    
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
        let Comments = await agent.comment.getAll(projectId, task.columnId, task.id)
        dispatch(setComments(Comments))
        setNewComment('')
    }

    const handleAssignToButton = async (user) => {
        const updatedTask = await agent.assignedTo.add(projectId, task.columnId, task.id, {userId: user.id})
        dispatch(setTask(updatedTask))
    }
    

    const handleLabelsDelete = async (label) => {
        const updatedTask = await agent.label.delete(projectId, task.columnId, task.id, label.id)
        dispatch(setTask(updatedTask))
    }

    const handleAssignedToDelete = async (user) => {
        const updatedTask = await agent.assignedTo.delete(projectId, task.columnId, task.id, user.id)
        dispatch(setTask(updatedTask))
    }
    
    const iconColor = "#141E27"
    
    const handleCompleted = async (id) => {
        await agent.task.update(projectId, task.columnId, id, {completed: true})
        dispatch(setColumns(await agent.column.getAll(projectId)))
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
                    
                    {/*close icon in the top left corner of the modal*/}
                    <Box textAlign='right'>
                        <IconButton color="secondary" aria-label="upload picture" component="span" onClick={handleClickAway}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    {/*content of the modal*/}
                    <Container fixed sx={{margin: '0px'}}>
                        
                        {/*title grid*/}
                        <Grid container spacing={2}>
                            {/*title icon*/}
                            <Grid item xs={1.5} sm={1} md={0.7}>
                                <TitleIcon fontSize="medium"  sx={{bgcolor: {iconColor}, border: '1px solid{iconColor', color:'#ffffff', marginLeft:'0px', borderRadius: '5px'}}/>
                            </Grid>
                            {/*title text - text area*/}
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
                        
                        <Container sx={{ display: { xs:'inline', sm: 'inline', md: 'none' } }}>
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div style={{paddingTop: '20px'}}>
                                        Labels: {' '}
                                        <Chip label="+" {...bindTrigger(popupState)}/>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <LabelsEdit labels={task.labels}/>
                                        </Popover>
                                        {
                                            task.labels ? 
                                                task.labels.map(label => (
                                                    <Chip label={label.text} variant="outlined" key={label.id} onDelete={() => handleLabelsDelete(label)}/>
                                                )) : ''
                                                
                                           
                                        }
                                    </div>
                                )}
                            </PopupState>
                            
                            <PopupState variant="popover" popupId="assignTo" >
                                {(popupState) => (
                                    <div style={{paddingTop: '20px'}}>
                                        Assigned To: {' '}
                                        <Chip label="+" {...bindTrigger(popupState)}/>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <SearchMembers handleSubmit={handleAssignToButton}/>

                                        </Popover>
                                        {
                                            task.assignedTo ? 
                                            task.assignedTo.map(member => (
                                                <Tooltip title={`${member.firstName} ${member.lastName}`} arrow>
                                                    <Chip
                                                        avatar={<Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                                        key={member.id} sx={{bgcolor: `${member.firstName} ${member.lastName}`.toColor()}}/>}
                                                        label={`${member.firstName} ${member.lastName}`}
                                                        variant="outlined"
                                                        sx={{marginRight: '3px'}}
                                                        onDelete={() => handleAssignedToDelete(member)}
                                                    />
                                                </Tooltip>
                                            )) : ''
                                        }
                                    </div>

                                )}
                            </PopupState>
                        </Container>
                        <Divider sx={{paddingTop: '20px'}}/>
                        
                        
                        <Grid container spacing={2}>
                            {/*desc & comments grid*/}
                            <Grid item xs={12} sm={12} md={9} lg={10}>
                                <Grid container spacing={2} marginTop={4}>
                                    <Grid item xs={1.5} sm={1} md={0.7}>
                                        <NotesIcon fontSize="medium"  sx={{bgcolor: {iconColor}, border: `1px solid ${iconColor}`, color:{iconColor}, borderRadius: '5px'}}/>
                                    </Grid>
                                    <Grid item xs={10.5} sm={11} md={11}>
                                        <Typography variant='h6'>Description</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={0.7}>

                                    </Grid >
                                    {
                                        (task.description && !descriptionClicked) ? (
                                            <Grid item xs={11}>
                                                <Typography variant='body1' sx={{whiteSpace: 'pre-line'}} onClick={(() => setDescriptionClicked(true))}>{task.description}</Typography>
                                            </Grid>
                                        ) : <>
                                            {

                                                (addDescriptionClicked || descriptionClicked) ? (
                                                    <Grid item xs={11}>
                                                        <form noValidate autoComplete="off" onSubmit={handleDescriptionSubmit} style={{margin: '0px', padding:'0px'}}>
                                                            <TextField fullWidth onChange={(e) => setNewDescription(e.target.value)}
                                                                       value={newDescription || ''} id="outlined-basic" label="Description" variant="outlined" multiline rows={5}  color='secondary' sx={{bgcolor: 'white', marginRight: '1rem', marginBottom: '5px'}}/>
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
                                    <Grid item xs={1.5} sm={1} md={0.7}>
                                        <CommentIcon fontSize="medium"  sx={{bgcolor: {iconColor}, border: '1px solid', color:{iconColor}, marginLeft:'0px', borderRadius: '5px'}}/>
                                    </Grid>
                                    <Grid item xs={10.5} sm={11} md={11} marginBottom={2}>
                                        <Typography variant='h6' >Comments</Typography>

                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2} lg={1} xl={0.8}>
                                            <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                                                    key={user.id} sx={{bgcolor: `${user.firstName} ${user.lastName}`.toColor()}}/>
                                        </Grid>
                                        <Grid item xs={10} lg={11} xl={11.2}>
                                            <form noValidate autoComplete="off" onSubmit={handleCommentSubmit} style={{margin: '0px', padding:'0px'}}>
                                                <TextField fullWidth onChange={(e) => setNewComment(e.target.value)}
                                                           value={newComment} id="outlined-basic" label="Comment" variant="outlined" multiline rows={2}  color='secondary' sx={{bgcolor: 'white', marginRight: '1rem', marginBottom: '5px'}}/>
                                                <Button type="submit" color="secondary" size="small" variant="outlined" onSubmit={(() => handleCommentSubmit)}>Save</Button>
                                            </form>
                                        </Grid>
                                    </Grid>
                                    {
                                        comments ? 
                                        comments.map(comment => (
                                            <>
                                                <Comment name={`${comment.user.firstName} ${comment.user.lastName}`} username={comment.user.userName} text={comment.text} comment={comment} key={comment.id}/>
                                            </>
                                            
                                        )) : ('')
                                    }
                                </Grid>
                            </Grid>
                            
                            {/*labels & assigned members grid*/}
                            
                                <Grid item xs={0} sm={0} md={3} lg={2} marginTop={4} sx={{ display: { xs:'none', sm: 'none', md: 'inline' } }}>
                                    <Typography variant='subtitle1' sx={{ display: { xs:'none', sm: 'none', md: 'inline' } }}>Labels:</Typography>
                                    <PopupState variant="popover" popupId="demo-popup-popover">
                                        {(popupState) => (
                                            <div>
                                                <Chip label="+" {...bindTrigger(popupState)}/>
                                                <Popover
                                                    {...bindPopover(popupState)}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <LabelsEdit labels={task.labels}/>
                                                </Popover>
                                                {
                                                    task.labels ?
                                                    task.labels.map(label => (
                                                        <Chip label={label.text} variant="outlined" key={label.id} onDelete={() => handleLabelsDelete(label)}/>
                                                    )) : ''
                                                }
                                            </div>
                                        )}
                                    </PopupState>

                                    <Typography variant='subtitle1' marginTop={12}>Assigned To:</Typography>
                                    <PopupState variant="popover" popupId="assignTo">
                                        {(popupState) => (
                                            <div style={{minHeight: "200px"}}>
                                                <Chip label="+" {...bindTrigger(popupState)}/>
                                                <Popover
                                                    {...bindPopover(popupState)}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <SearchMembers handleSubmit={handleAssignToButton}/>

                                                </Popover>
                                                {
                                                    task.assignedTo ?
                                                    task.assignedTo.map(member => (
                                                        <Tooltip title={`${member.firstName} ${member.lastName}`} arrow>
                                                            <Chip
                                                                avatar={<Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                                                key={member.id} sx={{bgcolor: `${member.firstName} ${member.lastName}`.toColor()}}/>}
                                                                label={`${member.firstName} ${member.lastName}`}
                                                                variant="outlined"
                                                                sx={{marginRight: '3px'}}
                                                                onDelete={() => handleAssignedToDelete(member)}
                                                            />
                                                        </Tooltip>
                                                    )) : ''
                                                }
                                            </div>

                                        )}
                                    </PopupState>
                                    <div style={{marginTop: 40}}>
                                        Actions:
                                    </div>
                                    <div style={{marginTop: 20}}>
                                        <Button sx={{color: "#141E27"}} color="success" size="small" onClick={() => handleCompleted(task.id)} variant="outlined">Mark as completed</Button>
                                    </div>
                                    <div style={{marginTop: 20}}>
                                        <Button sx={{color: "#d83a3a"}} color="error" size="small" onClick={() => handleDelete(task.id)} variant="outlined">Delete Task</Button>
                                    </div>


                                </Grid>
                            
                        </Grid>
                        <Container sx={{ display: { xs:'inline', sm: 'inline', md: 'none' }, marginTop: '100px' }}>
                            <Grid container>
                                <Grid item xs={3}>
                                    Actions: {'  '}
                                </Grid>
                                <Grid item xs={4} sx={{marginLeft: '10px'}}>
                                    <Button sx={{color: "#141E27"}} color="success" size="small" onClick={() => handleCompleted(task.id)} variant="outlined">Mark as completed</Button>
                                    <Button sx={{color: "#d83a3a", marginTop:'5px'}} color="error" size="small" onClick={() => handleDelete(task.id)} variant="outlined">Delete Task</Button>
                                </Grid>
                                
                                
                            </Grid>
                        </Container>
                    </Container>
                </Box>
            </Fade>
        </Modal>
    );
};