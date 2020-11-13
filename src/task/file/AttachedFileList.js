import React, {useEffect, useState} from "react";
import {FileNameWithHref} from "../FileNameWithHref";
import {getFileInfosOfTask} from "../../rest-service/FileService";
import * as PropTypes from "prop-types";
import ListItem from '@material-ui/core/ListItem';
import {useMaterialListItemStyles} from '@mui-treasury/styles/listItem/material';
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {FileBox} from "./FileBox";
import {getUserId} from "../../user/UserInfo";


export function AttachedFilesTable(props) {
    const task = props.task;
    const [files, setFiles] = useState([]);
    const classes = useMaterialListItemStyles();
    useEffect(() => {

        if (task) {
            getFileInfosOfTask(task?.id).then(data => setFiles(data));
        }

    }, [task])


    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,

    };


    return (< div style={{paddingLeft: 20}}>
            <Typography color={"textPrimary"} variant={'h6'}>
                Attached files
            </Typography>
            <div>
                < Paper style={{maxHeight: 350, maxWidth: 550, overflow: 'auto'}}>
                    <List style={flexContainer}>
                        {Array.from(files).map(file => <div>
                            <ListItem classes={classes} selected>
                                <FileBox file={file} canDelete={task.creatorId === getUserId().toString()} />
                            </ListItem>

                            {/*  {task.creatorId === getUserId().toString() && <DeleteFileButton taskId={taskId} fileId={file?.id}/>}*/}
                            {/*TODO add delete functionality to file table*/}

                        </div>)}
                    </List>
                </Paper>
            </div>

        </div>
    )
}

AttachedFilesTable.propTypes = {
    task: PropTypes.object.isRequired
}