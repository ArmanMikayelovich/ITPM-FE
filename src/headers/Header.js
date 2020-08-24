import {Link} from "react-router-dom";
import React from "react";

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Log in</Link></li>
                    <li><Link to={ {
                            pathname: '/browse',
                            // projectId: 2
                        }
                    }> Browse projects</Link></li>
                </ul>
            </nav>
        </header>
    )
}

