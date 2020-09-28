import {Link} from "react-router-dom";
import React from "react";
import {onLinkClickAction} from "../project/confirm/onClickAction";
import {SearchBarComponent} from "../search/SearchBarComponent";

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/'}}>Home</Link></li>
                    <li><Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/login'}}>Log in</Link></li>
                    <li><Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/browse-projects'}}> Browse projects</Link></li>
                </ul>
            </nav>
            <SearchBarComponent />
        </header>
    )
}

