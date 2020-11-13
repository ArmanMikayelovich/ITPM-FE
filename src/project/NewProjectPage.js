import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useLocation, useParams} from "react-router";
import {getProjectById} from "../rest-service/ProjectService";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {getTaskById} from "../rest-service/TaskService";

const drawerWidth = 250;
const BACKLOG = 'backlog';
const CREATE_SUBTASK = 'create-subtask';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'absolute',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        position: 'absolute',
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: 65,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        position: 'relative',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
}));

export function NewProjectPage(props) {
    let {projectId} = useParams();
    const [project, setProject] = useState();
    useEffect(() => {
        getProjectById(projectId).then(data => {
            setProject(data);
        })
    }, [projectId])

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <NavigationBar project={project}/>
                    {/*   <Link to={`/projects/${projectId}`}>
                        <Typography variant="h6" noWrap style={{color: 'white'}}>
                            {project?.name}
                        </Typography></Link>*/}
                </Toolbar>
            </AppBar>
            <Drawer

                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {['Tasks', 'Back-Log', 'Settings'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.drawerHeader}/>

                {props.children}


            </main>
        </div>
    );
}

function NavigationBar(props) {
    let location = useLocation();
    let {projectId, taskId} = useParams();
    const [task, setTask] = useState();
    useEffect(() => {
        if (taskId) {
            getTaskById(taskId).then(data => setTask(data));
        }
    }, [location])

    const project = props.project;
    const path = location.pathname;
    console.clear();
    console.log(location);

    let link = <Link to={`/projects/${projectId}`}>
        <Typography variant="h6" noWrap style={{color: 'white'}}>
            {project?.name}
        </Typography></Link>

    if(taskId && path.includes(CREATE_SUBTASK) ) {
        link = (<div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Link to={`/projects/${projectId}`}>
                    <Typography variant="h6" noWrap style={{color: 'white'}}>
                        {project?.name}
                    </Typography>
                </Link>
            </div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Typography variant="h6" noWrap style={{color: 'white'}}>
                    &nbsp;\ &nbsp;tasks &nbsp;\ &nbsp;
                </Typography>
            </div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Link to={`/projects/${projectId}/tasks/${taskId}`}>
                    <Typography variant="h6" noWrap style={{color: 'white'}}>
                        {task?.name}
                    </Typography>
                </Link>
            </div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Typography variant="h6" noWrap style={{color: 'white'}}>
                    &nbsp;\ &nbsp;Create Subtask
                </Typography>
            </div>
        </div>)
   } else if (taskId) {
        link = (<div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Link to={`/projects/${projectId}`}>
                    <Typography variant="h6" noWrap style={{color: 'white'}}>
                        {project?.name}
                    </Typography>
                </Link>
            </div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Typography variant="h6" noWrap style={{color: 'white'}}>
                    &nbsp;\ &nbsp;tasks &nbsp;\ &nbsp;
                </Typography>
            </div>
            <div style={{display: 'inline-block', position: 'relative'}}>
                <Link to={`/projects/${projectId}/tasks/${taskId}`}>
                    <Typography variant="h6" noWrap style={{color: 'white'}}>
                        {task?.name}
                    </Typography>
                </Link>
            </div>
        </div>)
    } else if (path.includes(BACKLOG)) {
        link = (<div>
                <div style={{display: 'inline-block', position: 'relative'}}>
                    <Link to={`/projects/${projectId}`}>
                        <Typography variant="h6" noWrap style={{color: 'white'}}>
                            {project?.name}
                        </Typography>
                    </Link>
                </div>
                <div style={{display: 'inline-block', position: 'relative'}}>
                    <Typography variant="h6" noWrap style={{color: 'white'}}>
                        &nbsp;\&nbsp;
                    </Typography>
                </div>
                <div style={{display: 'inline-block', position: 'relative'}}>
                    <Link to={`/projects/${projectId}/backlog`}>
                        <Typography variant="h6" noWrap style={{color: 'white'}}>
                            BackLog
                        </Typography>
                    </Link>
                </div>
            </div>
        )
    }


    return (
        link
    )

}

NavigationBar.propTypes = {
    project: PropTypes.object.isRequired
}