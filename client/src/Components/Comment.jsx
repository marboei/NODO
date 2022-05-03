
import * as React from 'react';
import {Container, Grid, Link, Paper, styled, Typography} from "@mui/material";
import {stringAvatar} from "../Utils/stringAvatar";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import agent from "../Data/agent";
import {setTask} from "../store/Slices/taskSlice";
import {useParams} from "react-router-dom";
import {setComments} from "../store/Slices/commentsSlice";
import {useEffect, useState} from "react";


export const Comment = ({username, name, text, comment}) => {
    
    const {user} = useSelector(state => state.user)
    const {projectId} = useParams()
    const {task} = useSelector(state => state.task)
    const {comments} = useSelector(state => state.comments)
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setLiked(false)
            comment.likes?.forEach(like => {
                if(like.userId == user.id){
                    setLiked(true)
                } 
            })
        
    }, [liked, comments])
    
    const checkLiked = () => {
        comments.likes?.forEach(like => {
            if(like.userId.equals(user.id)){
                return true
            }
        })
        return false
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body1,
        color: theme.palette.text.secondary,
        textAlign: 'left',
        lineHeight: '30px',
        padding: '7px',
        wordWrap: 'break-word',
    }));

    const handleCommentDelete = async() => {
        const deletedComment = await agent.comment.delete(projectId, task.columnId, task.id, comment.id)
        let newTask = {...task, comments: task.comments.filter(c => c.id !== comment.id)}
        dispatch(setTask(newTask))
        dispatch(setComments(newTask.comments))
    }
    
    const handleCommentLike = async() => {
        const newComment = await agent.like.add(projectId, task.columnId, task.id, comment.id, {userId: user.id})
        console.log(comments)
        let newComments = await agent.comment.getAll(projectId, task.columnId, task.id)
        dispatch(setComments(newComments))
    }
    
    const handleCommentUnlike = async() => {
        const newComment = await agent.like.delete(projectId, task.columnId, task.id, comment.id, user.id)
        let newComments = await agent.comment.getAll(projectId, task.columnId, task.id)
        dispatch(setComments(newComments))
    }
    
    return (
        
            <Grid container marginBottom={2}>
                <Grid item xs={2.5} sm={1.5} md={1.5} lg={1}>
                    <Avatar {...stringAvatar(name)}
                            key={name} sx={{margin: '10px', bgcolor: name.toColor(), width: 35, height: 35}}/>
                </Grid>
                <Grid item xs={9.5} sm={10.5} md={10.5} lg={11}>
                    <Typography variant='subtitle1'>{username}</Typography>
                    <Item elevaion={16} padding={2}>{text}</Item>
                    {
                        comment.user.id === user.id ? (
                            <Link href="#" variant="subtitle2" color='secondary' textAlign="right" onClick={() => handleCommentDelete(comment.id)}>
                                {"Delete"}
                            </Link>
                        ) : (
                            <></>
                        )
                    }
                    {" - "}

                    {
                        liked ? (
                            <Link href="#" variant="subtitle2" color='secondary' textAlign="right" onClick={() => handleCommentUnlike()}>
                                Unlike
                            </Link>
                        ) : (
                            <Link href="#" variant="subtitle2" color='secondary' textAlign="right" onClick={() => handleCommentLike()}>
                                Like
                            </Link>
                        )
                    }
                    {" - "}
                    {comment.likes == null ? 0 : comment.likes.length}
                </Grid>

            </Grid>
            
    );
};