
import * as React from 'react';
import {Grid} from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";


export const CardPreview = ({task}) => {
    return (
        <>
            {
                (task.description || task.comments ||  task.assignedTo ||  task.labels) 
                    ?
                    <Grid container sx={{maxHeight: 25, marginTop: '0px', marginLeft: '3px', paddingBottom:'3px'}}>
                        {
                            task.description ? <>
                                <Grid item xs={2}>
                                    {/*<Badge variant="dot" color="secondary">*/}
                                    <NotesIcon sx={{height: '15px', width:'auto'}}/>
                                </Grid>
                            </> : ''
                        }

                        {
                            (task.comments !== null && task.comments?.length > 0) ? <>
                                <Grid item xs={2}>
                                    <ModeCommentOutlinedIcon sx={{height: '15px', width:'auto'}}/>
                                    <span style={{fontSize: '12px', paddingLeft: '2px'}}>{task.comments.length}</span>
                                </Grid>
                            </> : ''
                        }

                        {
                            (task.labels !== null && task.labels?.length > 0) ? <>
                                <Grid item xs={2}>
                                    {/*<Badge variant="dot" color="secondary">*/}
                                    <LabelOutlinedIcon sx={{height: '15px', width:'auto'}}/>
                                    <span style={{fontSize: '12px', paddingLeft: '2px'}}>{task.labels.length}</span>
                                </Grid>
                            </> : ''
                        }

                        {
                            (task.assignedTo !== null && task.assignedTo?.length > 0) ? <>
                                <Grid item xs={2}>
                                    {/*<Badge variant="dot" color="secondary">*/}
                                    <GroupOutlinedIcon sx={{height: '15px', width:'auto'}}/>
                                    <span style={{fontSize: '12px', paddingLeft: '2px'}}>{task.assignedTo.length}</span>
                                </Grid>
                            </> : ''
                        }
                        
                    </Grid> : ''
            }
            
        </>
    );
};