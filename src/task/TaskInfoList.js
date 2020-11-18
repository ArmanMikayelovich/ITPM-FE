import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as PropTypes from 'prop-types';
import {UserFullNameWithLinkToPage} from "../user/UserInfo";
import Typography from "@material-ui/core/Typography";
import {LinkToTask} from "./LinkToTask";
import {ProjectWithLinkToPage} from "../project/Projects";
import {ProjectVersion} from "../project/ProjectVersion";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: "inherit",
    },
}));


export function TaskInfoList(props) {
    const classes = useStyles();
    const task = props.task;

    return (
        <div className={classes.root}>

            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                    <ListItemText primary="Assignee: "/>
                    <Typography variant={'body1'}>

                        <UserFullNameWithLinkToPage userId={task?.assignedUserId}/>
                    </Typography>
                </ListItem>
                { task?.triggeredById && <div>
                    <ListItem>
                        <ListItemText primary="Trigger: "/>
                        <Typography variant={'body1'}>

                            {task.triggerType}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Trigger from : "/>
                        <Typography variant={'body1'}>

                            <LinkToTask taskId={task?.triggeredById}/>
                        </Typography>
                    </ListItem>
                </div>
                }
                {task?.parentId &&
                <ListItem>
                    <ListItemText primary="Parent: "/>
                    <Typography variant={'body1'}>

                        <LinkToTask taskId={task?.parentId}/>
                    </Typography>
                </ListItem>
                }
                <ListItem>
                    <ListItemText primary="Creator: "/>
                    <Typography variant={'body1'}>
                        <UserFullNameWithLinkToPage userId={task?.creatorId}/>
                    </Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Project: "/>
                    <Typography variant={'body1'}>
                        <ProjectWithLinkToPage projectId={task?.projectId}/>
                    </Typography>
                </ListItem>
                { task?.projectVersionId &&  <ListItem>
                    <ListItemText primary="Project version: "/>
                    <Typography variant={'body1'}>
                        <ProjectVersion versionId={task.projectVersionId}/>
                    </Typography>
                </ListItem>}

            </List>
        </div>
    );
}

TaskInfoList.propTypes = {
    task: PropTypes.object.isRequired,

};