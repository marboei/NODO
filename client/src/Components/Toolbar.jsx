import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../store/Slices/userSlice";
import {AvatarGroup, Divider} from "@mui/material";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function stringToColor(string) {
    let hash = 0;
    let i;
    
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substring(-2);
    }

    return color;
}

export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 41, 
            height: 41,
            alignItems: 'center'
        },
        children: `${name.toString().split(' ')[0][0]}${name.toString().split(' ')[1][0]}`,
    };
}


export default function PrimarySearchAppBar() {
    const {user} = useSelector(state => state.user)
    const {members} = useSelector(state => state.columns)
    const {currentProject} = useSelector(state => state.columns)
    const {projectId} = useParams()
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    useEffect(() => {
        console.log(user ? user : 'bro')
    }, [user])

    

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleSignOut = () => {
        localStorage.removeItem('user')
        setAnchorEl(null);
        handleMobileMenuClose();
        dispatch(setUser(false))
        navigate('/login')

    };


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate('/')}
                        sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer'}}
                    >
                        NoDo
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {
                        user ? (
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    onClick={() => navigate('/projects')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Projects
                                </Button>
                            </Box>
                        ) : ''
                    }
                    
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        {
                            currentProject !== null ? (
                                <>
                                    <AvatarGroup max={4}>
                                        {
                                            members.filter(member => member.id !== user.id)
                                            .map(member => (
                                                <Avatar {...stringAvatar(`${member.firstName} ${member.lastName}`)}
                                                        key={member.id} sx={{margin: '10px'}}/>
                                            ))
                                        }
                                    </AvatarGroup>
                                    <Divider orientation="vertical" flexItem>
                                        MEMBERS
                                    </Divider>
                                </>
                            ) : ''
                        }
                        { user ? (
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}/>
                                </IconButton>
                                    
                            ) : (
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Log In
                                </Button>
                            )
                        }
                        
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                           
                                <AccountCircle/>
                            
                        </IconButton>
                        
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}