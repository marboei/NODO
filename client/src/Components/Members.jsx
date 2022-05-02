 
import * as React from 'react';
import {AvatarGroup, IconButton, List, ListItem, ListItemAvatar, ListItemText, Popover} from "@mui/material";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import {SearchUsers} from "./SearchUsers";
import {stringAvatar} from "../Utils/stringAvatar";
import {useState} from "react";
import agent from "../Data/agent";
import {setMembers} from "../store/Slices/columnsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {MembersEdit} from "./MembersEdit";

export const Members = () => {
    const dispatch = useDispatch()
    const {members} = useSelector(state => state.columns)
    const [addMemberClicked, setAddMemberClicked] = useState(false)
    const {projectId} = useParams()
    const {user} = useSelector(state => state.user)
    

    const handleAddMember = async (user) => {
        const updatedProject = await agent.project.addUserToProject(projectId, user.id)
        dispatch(setMembers(await agent.project.getProjectUsers(projectId)))
    }

    const handleRemoveMember = async (user) => {
        const updatedProject = await agent.project.removeUserFromProject(projectId, user.id)
        dispatch(setMembers(await agent.project.getProjectUsers(projectId)))
    }
    
    const renderMembers = () => {
        
    }
    
    return (
        <>
            <AvatarGroup sx={{alignItems:'center', maxWidth: '300px'}} align='center'>
                <PopupState variant="popover" popupId="assignTo">
                    {(popupState) => (
                        <div>
                            <Avatar {...bindTrigger(popupState)}>
                                <Tooltip title="Add member" arrow>
                                    <IconButton aria-label="add" onClick={() => setAddMemberClicked(true)}>
                                        <AddIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </Avatar>
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
                                <SearchUsers handleSubmit={handleAddMember}/>

                            </Popover>

                        </div>
                    )}
                </PopupState>
                {
                    members.length < 4 ? (
                            <>
                                <MembersEdit members={members} setAddMemberClicked={setAddMemberClicked} user={user} handleRemoveMember={handleRemoveMember} title={'...'}/>
                                {
                                    members.map((member) => (

                                        <Tooltip title={`${member.firstName} ${member.lastName}`} arrow>
                                            <Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                    key={member.id} sx={{bgcolor: `${member.firstName} ${member.lastName}`.toColor()}}/>
                                        </Tooltip>

                                    )) 
                                }
                                
                            </>
                        )
                     : (
                        <>
                            <MembersEdit members={members} setAddMemberClicked={setAddMemberClicked} user={user} handleRemoveMember={handleRemoveMember} title={`+${members.length - 3}`}/>
                            
                            <Tooltip title={`${members[0].firstName} ${members[0].lastName}`} arrow>
                                <Avatar {...stringAvatar(`${members[0].firstName} ${members[0].lastName}`)}
                                        key={members[0].id} sx={{bgcolor: `${members[0].firstName} ${members[0].lastName}`.toColor()}}/>
                            </Tooltip>
                            <Tooltip title={`${members[1].firstName} ${members[1].lastName}`} arrow>
                                <Avatar {...stringAvatar(`${members[1].firstName} ${members[1].lastName}`)}
                                        key={members[1].id} sx={{bgcolor: `${members[1].firstName} ${members[1].lastName}`.toColor()}}/>
                            </Tooltip>
                            <Tooltip title={`${members[2].firstName} ${members[2].lastName}`} arrow>
                                <Avatar {...stringAvatar(`${members[2].firstName} ${members[2].lastName}`)}
                                        key={members[2].id} sx={{bgcolor: `${members[2].firstName} ${members[2].lastName}`.toColor()}}/>
                            </Tooltip>
                            
                        </>
                        )
                }
            </AvatarGroup>

        </>
    );
};