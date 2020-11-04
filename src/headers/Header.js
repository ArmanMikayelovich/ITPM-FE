import React, {useEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {LogOutButton} from "../logout/LogoutButton";
import {onLinkClickAction} from "../confirm/onClickAction";
import {Link} from "react-router-dom";
import {getUserId, UserFullName} from "../user/UserInfo";

const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12,

    },
    menuButton: {
        marginRight: 16,
        marginLeft: -12
    },
    title: {
        color: 'white'
    }
})

export function Header() {


    const [isAuthorized, setIsAuthorized] = useState(false);
    const classes = useStyles()
    useEffect(() => {
        fetch(HOST_ADDRESS + "/users/user", {
            method: "GET",
            credentials: "include",
        }).then(response => {
            if (response.status === 200) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false);
            }
        })
    })
    return (

        <header>
            <AppBar position="static">
                <Toolbar>
                    <Link onClick={e => onLinkClickAction(e)} to={{pathname: '/'}}>
                        <Typography variant="h5" className={classes.title}>
                            ITPM
                        </Typography>
                    </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {isAuthorized ?
                        <Link onClick={e => onLinkClickAction(e)} to={{pathname: '/browse-projects'}}>
                            <Typography variant="h6" className={classes.title}>
                                Projects
                            </Typography>
                        </Link>: '' }
                     &nbsp;&nbsp;&nbsp;&nbsp;


                    <section className={classes.rightToolbar}>
                    <div style={{marginLeft: "auto",
                        display:"inline-block"}}>
                        {isAuthorized ?
                            <Link onClick={e => onLinkClickAction(e)} to={{
                                pathname: `/users/${getUserId()}`
                            }}> <Typography variant="h6" style={{float:'right'}} className={classes.title}>
                                <UserFullName userId={getUserId()}/>
                            </Typography> </Link> : ''
                        }

                    </div>&nbsp;&nbsp;&nbsp;&nbsp;


                    <div style={{float:'right', marginLeft: "auto",
                        marginRight: 3,display:"inline-block"}}>
                        {isAuthorized ?
                            <LogOutButton/> :
                            <Link onClick={e => onLinkClickAction(e)} to={{pathname: '/login'}}>
                                <Button color={'primary'}
                                        style={{backgroundColor: 'green', color: "white"}}
                                >Log in </Button>
                            </Link>

                        }
                    </div>
                      </section>


                </Toolbar>
            </AppBar>
            {/*<nav>*/}

            {/*       <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/'}}>Home</Link>&nbsp;&nbsp;&nbsp;*/}
            {/*        <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/login'}}>Log in</Link>&nbsp;&nbsp;&nbsp;*/}
            {/*       <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/browse-projects'}}> Browse projects</Link>&nbsp;&nbsp;&nbsp;*/}
            {/*    {isAuthorized && <LogOutButton style={{float: "right"}} />}*/}
            {/*</nav>*/}
            {/*<SearchBarComponent />*/}
        </header>
    )
}

