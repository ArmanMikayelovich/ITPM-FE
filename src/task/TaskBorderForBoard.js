import Box from "@material-ui/core/Box";
import React from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import BugReportIcon from '@material-ui/icons/BugReport';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import BookIcon from '@material-ui/icons/Book';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import RepeatIcon from '@material-ui/icons/Repeat';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import Low from '../img/taskPriorityIcons/low.png'
import Default from '../img/taskPriorityIcons/default.png'
import High from '../img/taskPriorityIcons/high.png'
import {Link, useParams} from "react-router-dom";

/**
 * constants for task states
 * @type {string}
 */
const TODO = 'TODO';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';

/**
 * constants for task types
 * @type {string}
 */
const TASK = "TASK";
const SUBTASK = "SUBTASK";
const EPIC = "EPIC";
const BUG = "BUG";
const STORY = "STORY";
const CHANGE = "CHANGE";

/**
 * constants for task priority
 * @type {string}
 */
const LOW = 'LOW';
const DEFAULT = 'DEFAULT';
const HIGH = 'HIGH';

const useStyles = makeStyles({
    name: {
        top: 5,
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bolder',
        display: "inline-block",
        width: '250px',
        height: '150',
        paddingLeft: '5px',
        float: 'left'
    },
    taskState: {
        position: 'relative',
        top: 3,
        color: 'white',
        textAlign: 'center',
        width: '80px',
        // height: '35px',
        display: "inline-block",
        paddingRight: '5px',
        float: 'right',
        fontSize: 12,
        fontWeight: 'bold',
    },
    taskType: {
        display: 'inline-block',
        position: 'relative',
        top: 3,
        paddingLeft: '5px',
        float: 'left'
    },
    img: {
        position: 'relative',
        top: 3,
        right: 7,
        width: 20,
        height: 20,
        float: 'right',
    }
});

export function TaskBorderForBoard(props) {
    const {projectId} = useParams();
    const task = props.task;
    const classes = useStyles();

    const taskState = task.taskState;

    const borderColor = taskState === TODO ?
        'primary.main' :
        taskState === IN_PROGRESS ? 'warning.main' : 'success.main';

    let name;
    if (task.name.length > 60) {
        name = task.name.substring(0, 60).concat('...');
    } else {
        name = task.name;
    }
    return (
        <div style={{display: 'table'}}>
            <br/>
            <Box height="100%" style={{height: 50}} borderRadius={12} border={1} borderColor="grey.500">
                <TaskTypeIconComponent taskType={task.taskType}/>
                <div className={classes.name}>
                    <Link to={`/projects/${projectId}/tasks/${task.id}`}>
                        {name}
                    </Link>
                </div>
                <div className={classes.taskState}>
                    <Box bgcolor={borderColor} borderRadius={12} border={1}
                         borderColor={borderColor}>{taskState === TODO ?
                        TODO :
                        taskState === IN_PROGRESS ? 'ONGOING' : DONE}</Box>
                </div>
                <br/>
                <TaskPriorityIcon priority={task.priority}/>

            </Box>
        </div>
    );
}

function TaskPriorityIcon(props) {
    const classes = useStyles();
    const priority = props.priority;
    let img;

    switch (priority) {
        case LOW : {
            img = <img className={classes.img} src={Low} alt={LOW}/>
            break;
        }
        case DEFAULT : {
            img = <img className={classes.img} src={Default} alt={DEFAULT}/>
            break;
        }
        case HIGH : {
            img = <img className={classes.img} src={High} alt={HIGH}/>
            break;
        }
        default : {
            img = <img className={classes.img} src={Default} alt={DEFAULT}/>
            break;
        }
    }
    return (
        <div className={classes.img}>
            <Tooltip title={`Priority:${priority.toLowerCase()}`}>
                {img}
            </Tooltip>
        </div>
    );
}

TaskPriorityIcon.propTypes = {
    priority: PropTypes.string.isRequired,
}

TaskBorderForBoard.propTypes = {
    task: PropTypes.object.isRequired,
}

export function TaskTypeIconComponent(props) {
    const taskType = props.taskType;
    const classes = useStyles();
    const icon = getTaskTypeIcon(taskType);
    return (
        <div className={classes.taskType}>
            <Tooltip title={taskType}>
                {icon}
            </Tooltip>

        </div>
    );
}


TaskTypeIconComponent.propTypes = {
    taskType: PropTypes.string.isRequired,
}

function getTaskTypeIcon(taskType) {
    switch (taskType) {
        case TASK: {
            return <AssignmentTurnedInIcon style={{color: 'blue'}}/>;
        }
        case SUBTASK : {

            return <BookmarksIcon style={{color: 'blue'}}/>;
        }
        case EPIC : {

            return <FlashOnIcon style={{color: 'purple'}}/>;
        }
        case STORY: {
            return <BookIcon style={{color: 'green'}}/>;
        }
        case BUG : {
            return <BugReportIcon style={{color: 'red'}}/>;
        }
        case CHANGE : {
            return <RepeatIcon style={{color: 'red'}}/>
        }
        default: {
            return <AddIcon style={{color: 'blue'}}/>;
        }
    }

}