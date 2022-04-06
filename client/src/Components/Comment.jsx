
import * as React from 'react';
import {Container, Grid, Paper, styled, Typography} from "@mui/material";
import {stringAvatar} from "../Utils/stringAvatar";
import Avatar from "@mui/material/Avatar";


export const Comment = ({username, name, text}) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        textAlign: 'left',
        lineHeight: '30px',
        paddingLeft: '10px',
        wordWrap: 'break-word',
    }));
    
    return (
            <Grid container marginBottom={2}>
                <Grid item xs={1.5}>
                    <Avatar {...stringAvatar(name)}
                            key={name} sx={{margin: '10px', bgcolor: name.toColor(), width: 35, height: 35}}/>
                </Grid>
                <Grid item xs={10.5}>
                    <Typography variant='subtitle1'>{username}</Typography>
                    <Item elevaion={16} paddingLeft={2}>{text}</Item>
                </Grid>
            </Grid>
    );
};