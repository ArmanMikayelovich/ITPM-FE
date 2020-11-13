import IconButton from "@material-ui/core/IconButton";
import React, {useEffect, useState} from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Typography from "@material-ui/core/Typography";
import {useForm} from "react-hook-form";
import {changePromptContext} from "../App";
import {attachFileToTask} from "../rest-service/FileService";
import {useParams} from "react-router";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
export function AttachFileButtonComponent() {

    const [uploadingFiles, setUploadingFiles] = useState([]);
    let {taskId} = useParams();

    useEffect(() => {
        if (uploadingFiles.length === 0) {
            return;
        }


        if (uploadingFiles.length !== 0) {
            let promises = [];
            uploadingFiles.forEach(file => {
                promises.push(attachFileToTask(file, taskId));
            })
            Promise.all(promises).then(() => {
                alert("all files uploaded");
                window.location.reload(false);
            })

        }
    })

    const onFileChangeHandler = (e) => {
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }

        console.clear();
        console.log("UPLOAD FILES" + files);
        setUploadingFiles(files);
    };


    return (
        <div>
            <label htmlFor="upload-photo">
                <input
                    onChange={event => {
                        onFileChangeHandler(event)}}
                    style={{ display: "none" }}
                    id="upload-photo"
                    multiple={true}
                    name="upload-photo"
                    type="file"
                />
                <Fab
                    component="span"
                    size="small"
                    variant="extended"
                >
                    <AttachFileIcon/> <Typography variant={"body1"} color={"inherit"}>Attach Files</Typography>
                </Fab>
            </label>
            <p>
               {/* <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={event => {
                            onFileChangeHandler(event)}}
                    />

                    <IconButton style={{borderRadius: '4px'}}>
                        <AttachFileIcon/>
                        <Typography variant={"body1"} color={"textPrimary"}>Attach File</Typography>
                    </IconButton>
                </label>*/}


           {/*     <input type={'file'} multiple={true} onChange={event => {
                    onFileChangeHandler(event);
                    changePromptContext(true, "Create task not finished");
                }} name={'uploadedFiles'}
                /> <IconButton style={{borderRadius: '4px'}}>
                    <AttachFileIcon/>
                    <Typography variant={"body1"} color={"textPrimary"}>Attach File</Typography>
                </IconButton>*/}
            </p>



        </div> )


}