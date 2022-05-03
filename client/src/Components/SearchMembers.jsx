import * as React from 'react';
import {useEffect, useState} from 'react';
import {Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {stringAvatar} from "../Utils/stringAvatar";
import Avatar from "@mui/material/Avatar";

export const SearchMembers = ({handleSubmit}) => {
    const dispatch = useDispatch()
    const {task} = useSelector(state => state.task)
    const {members} = useSelector(state => state.columns)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchText, setSearchText] = useState('');
    const [usersQuery, setUsersQuery] = useState([]);
    const [textAreaClicked, setTextAreaClicked] = useState(false)
    const {projectId} = useParams()

    useEffect(() => {

    }, [usersQuery])




    return (

        <Container sx={{width: 'auto', height: 'auto', padding: 2, bgcolor: '#eeedde'}}>

            <TextField
                onChange={async (e) => {
                    setSearchText(e.target.value)
                    let filteredUsers = members
                    if(task.assignedTo){
                        task.assignedTo.forEach(member => {
                            filteredUsers = filteredUsers.filter(user => user.userName !== member.userName)
                        })
                    }
                    console.log(filteredUsers)
                    if(searchText.length === 0) {setUsersQuery([])} else {setUsersQuery(filteredUsers)}
                    
                }}
                value={searchText}  label="Search User" sx={{bgcolor: '#eeedde'}}
                onClick={() => setTextAreaClicked(true)}
            />


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
                                usersQuery != null ?
                                usersQuery.map(user => (
                                    <ListItem sx={{padding: 0}}>
                                        <ListItemButton onClick={() => handleSubmit(user)}>
                                            <ListItemAvatar>
                                                <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                                                        key={user.id} sx={{bgcolor: `${user.firstName} ${user.lastName}`.toColor()}}/>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.userName} />
                                        </ListItemButton>
                                    </ListItem>
                                )) : ''
                            }

                        </List>
                    </Box>
                ) : (
                    <></>
                )
            }
        </Container>
    );
};