import {HOST_ADDRESS} from "../constants/consts";
import {useForm} from "react-hook-form";
import React, {useLayoutEffect, useState} from "react";
import {UserFullNameWithLinkToPage} from "../user/UserInfo";

// import {comment} from 'comments.css'
function CreateCommentForm() {

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
                        console.log(`Comment successfully created ${JSON.stringify(data)}`);

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to save Comment. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to save Comment. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendComment(data)

    return (
        <div>
            <h3>Create Comment</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        console.log(`Comment successfully updated ${JSON.stringify(data)}`);

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
            console.log(data);
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
    const taskId = props.taskId;
    const name = props.name;
    const [comments, setComments] = useState();
    useLayoutEffect(() => {
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
    }, [taskId])


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
            'box-shadow': '0 2px 2px #cccccc',
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

