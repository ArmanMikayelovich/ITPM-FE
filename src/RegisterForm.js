import React from 'react';
import {useForm} from 'react-hook-form';

export function RegisterForm() {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
            fetch('http://localhost:8080/users', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(data)
            }).then(() => console.log(`Data Sent. ${JSON.stringify(data)}`))
                .catch(error => console.log(`an error occurred ${error}`));
    }
    return (
        <div>
            
            <h3>Registration</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"E-mail"} name='email' ref={register}/>
                <br/>
                <input type='text' name='firstName'  placeholder={"First name"}  ref={register}/>
                <br/>
                <input type='text' name='lastName'  placeholder={"Last name"} ref={register}/>
                <br/>
                <input type='password' name="password" placeholder={"Password"} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );
}