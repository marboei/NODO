// @flow 
import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import Tooltip from "@mui/material/Tooltip";
import {IconButton, List, ListItem, ListItemAvatar, ListItemText, Popover} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {stringAvatar} from "../Utils/stringAvatar";


export const MembersEdit = ({members, setAddMemberClicked, user, handleRemoveMember, title}) => {
    return (
        <PopupState variant="popover" popupId="assignTo">
            {(popupState) => (
                <>
                    <Avatar {...bindTrigger(popupState)}>
                        <Tooltip title="View all" arrow>
                            <IconButton aria-label="add" onClick={() => setAddMemberClicked(true)}>
                                {title}
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
                        <Container sx={{width:'450px', height: 'auto', padding: 2, bgcolor: '#eeedde'}}>
                            <div>
                                <List >
                                    {
                                        members.map(member => (
                                            <ListItem
                                                secondaryAction={
                                                    user.userName !== member.userName ? (
                                                        <Button onClick={() => handleRemoveMember(member)} sx={{color: "#d83a3a", marginTop:'5px'}} color="error" size="small" variant="outlined">Remove</Button>
                                                    ) : ''

                                                }
                                            >
                                                <ListItemAvatar>
                                                    <Tooltip title={`${member.firstName} ${member.lastName}`} arrow>
                                                        <Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                                key={member.id} sx={{bgcolor: `${member.firstName} ${member.lastName}`.toColor()}}/>
                                                    </Tooltip>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${member.firstName} ${member.lastName}`}
                                                    secondary={member.userName}

                                                />
                                            </ListItem>
                                        ))
                                    }


                                </List>
                            </div>

                        </Container>

                    </Popover>

                </>
            )}
        </PopupState>
    );
};