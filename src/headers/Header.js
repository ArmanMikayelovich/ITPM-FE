import {Link} from "react-router-dom";
import React from "react";
import {onLinkClickAction} from "../project/confirm/onClickAction";

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link onClick={e => onLinkClickAction(e) } to='/'>Home</Link></li>
                    <li><Link onClick={e => onLinkClickAction(e) } to='/login'>Log in</Link></li>
                    <li><Link onClick={e => onLinkClickAction(e) } to={ {
                            pathname: '/browse',
                            // projectId: 2
                        }
                    }> Browse projects</Link></li>
                </ul>
            </nav>
        </header>
    )
}

