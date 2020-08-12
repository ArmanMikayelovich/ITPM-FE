import {Link} from "react-router-dom";
import React from "react";

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Log in</Link></li>
                    <li><Link to='/projects'> Project Page</Link></li>
                    <li><Link to='/sprints'> Sprints Page</Link></li>
                    <li><Link to='/tasks'> Tasks Page</Link></li>

                </ul>
            </nav>
        </header>
    )
}

