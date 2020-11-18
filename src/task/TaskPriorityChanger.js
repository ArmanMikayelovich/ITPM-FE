import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as PropTypes from 'prop-types';
import {updateTaskPriority} from "../rest-service/TaskService";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export function TaskPriorityChanger(props) {
    const classes = useStyles();

    let task = props.task;
    const [priority, setPriority] = useState();
    useEffect(() => {
        setPriority(task?.priority);
    }, [task]);
    const isEnabled = props.isEnabled;

    const handleChange = (event) => {
        const newPriority = event.target.value;
        if (task.priority !== newPriority) {
            task.priority = newPriority
            updateTaskPriority(task).then((response) => {
                    if (response.status === 200) {
                        setPriority(newPriority);
                        alert("Task priority updated")
                    } else {
                        alert("Some error occurred in changing task state");
                    }
                }
            ).catch(error => console.log(`an error occurred ${error}`));
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                {priority && <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    onChange={handleChange}
                >
                    <MenuItem disabled={!isEnabled} value={'LOW'}>Low</MenuItem>
                    <MenuItem disabled={!isEnabled} value={'DEFAULT'}>Default</MenuItem>
                    <MenuItem disabled={!isEnabled} value={'HIGH'}>High</MenuItem>
                </Select>}

            </FormControl>
        </div>
    )

}

TaskPriorityChanger.propTypes = {
    task: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired
}