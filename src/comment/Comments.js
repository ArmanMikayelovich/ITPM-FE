import {HOST_ADDRESS} from "../constants/consts";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
import MultiSelect from "react-multi-select-component";
import {getUsersOfProject} from "../rest-service/ProjectService";
import {getTaskById} from "../rest-service/TaskService";
import {changePromptContext} from "../App";

export function CreateCommentForm(props) {
    const taskId = props.taskId;
    const updateTask = props.updatePage;
    const [usersOfProject, setUserOfProject] = useState([]);

    const [notifyingUsers, setNotifyingUsers] = useState([]);

    useEffect(() => {
        getTaskById(taskId).then(task => {
            getUsersOfProject(task.projectId).then(data => setUserOfProject(data.content));
        })
    }, [taskId]);

    const sendComment = (data) => {
        fetch(HOST_ADDRESS + '/tasks/' + data.taskId + "/comments", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        updateTask();
                    } else {
                        response.json().then(data =>
                            console.log(`Fail to save Comment. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to save Comment. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        changePromptContext(false, '');
        Object.assign(data, {notificationUsers: notifyingUsers.map(selected => selected.value)});
        alert(JSON.stringify(data));
        sendComment(data)
    };

    return (
        <div style={{
            margin: '10px',
            border: '1px solid #eee',
            'boxShadow': '0 2px 2px #cccccc',
            width: ' 500px',
            padding: '20px'
        }}>
            <h3>Add Comment</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden={true} type='text' defaultValue={getUserId()}
                       name='publisherId' ref={register}/>
                <input hidden={true} type='text' name='taskId' defaultValue={taskId} ref={register}/>
                <p>Add comment <br/>
                    <input onChange={() => changePromptContext(true, "Adding comment not finished.")} type='textarea' aria-multiline={true} name='text' placeholder={"Comment text"}
                           ref={register}/>
                </p>

                <MultiSelect
                    options={usersOfProject?.map(user => {
                        return {label: user.firstName + ' ' + user.lastName, value: user.userId}
                    })}
                    value={notifyingUsers}
                    onChange={setNotifyingUsers}
                    labelledBy={"Select Notifying users"}
                />
                <br/>
                <input value={"Add comment"} type='submit'/>
            </form>
        </div>
    );

}


function UpdateCommentForm() {

    const sendComment = (data) => {
        fetch(HOST_ADDRESS + '/tasks/' + data.taskId + "/comments", {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {


                    } else {
                        response.json().then(data =>
                            console.log(`Fail to updated Comment. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to updated Comment. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendComment(data)

    return (
        <div>
            <h3>Update Comment</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"Comment id"} name='id' ref={register}/>
                <br/>
                <input type='text' placeholder={"Publisher id"} name='publisherId' ref={register}/>
                <br/>
                <input type='text' name='taskId' placeholder={"Task id"} ref={register}/>
                <br/>
                <input type='textarea' name='text' placeholder={"Text"} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );

}


function CommentsByTaskId() {
    const [taskId, setTaskId] = useState("");
    const [comments, setComments] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/tasks/' + taskId + '/comments', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => response.json())
        .then(data => {

            setComments(JSON.stringify(data.content));
        })
        .catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Comments By Task id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setTaskId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <h5>Comments by task: {taskId}</h5>
            <ul>
                {comments}
            </ul>
        </div>
    );
}


function CommentById() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/tasks/comments/' + commentId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => {

            let json = response.json();
            json.then(data => setComment(JSON.stringify(data)));
        }
    ).catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Comment By id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setCommentId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <label>{comment}</label>
        </div>
    );
}


function DeleteComment() {

    const [commentId, setCommentId] = useState();

    const deleteTask = (commentId) => {
        fetch(HOST_ADDRESS + '/tasks/comments/' + commentId, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Comment ${commentId} deleting: status - ${response.status}`);
                        return response;
                    } else {
                        console.log(`An error occurred. Comment ${commentId} deleting: status - ${response.status}`);
                    }
                }
            )

            .catch(error => console.log(`an error occurred ${error}`));
    }

    return (
        <div>
            Delete Project <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setCommentId(e.target.value)}/>
            <button onClick={() => deleteTask(commentId)}>Get</button>

        </div>
    );
}

export function CommentList(props) {
    const task = props.task;
    const taskId = task.id;
    const name = props.name;
    const [comments, setComments] = useState();
    useEffect(() => {
        fetch(HOST_ADDRESS + `/tasks/${taskId}/comments`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {
                let json = response.json();
                json.then(data => {
                    let content = data.content;
                    let list = content.map(comment => <Comment key={comment.id} comment={comment}/>)
                    setComments(list);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [task])


    return (
        <div>

            <ul>{name}
                {comments}
            </ul>

        </div>
    )
}

export function Comment(props) {
    const comment = props.comment
    return (
        <div style={{
            margin: '10px',
            border: '1px solid #eee',
            'boxShadow': '0 2px 2px #cccccc',
            width: ' 500px',
            padding: '20px'
        }}>
            <div style={{float: "right"}}>{comment.createdAt}</div>
            <h5><UserFullNameWithLinkToPage userId={comment.publisherId}/></h5>
            <p>{comment.text}</p>
        </div>
    );
}

export function CommentsPage() {
    return (
        <div>
            <CreateCommentForm/>
            <br/>
            <UpdateCommentForm/>
            <br/>
            <CommentsByTaskId/>
            <br/>
            <CommentById/>
            <br/>
            <DeleteComment/>
            <br/>
        </div>
    );
}

