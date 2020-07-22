import {Link} from "react-router-dom";
import React from "react";

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/registration'>Registration</Link></li>
                </ul>
            </nav>
        </header>
    )
}

