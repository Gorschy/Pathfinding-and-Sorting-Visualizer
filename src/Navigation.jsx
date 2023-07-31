import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/sorting-visualizer">Sorting Visualizer</Link>
                </li>
                <li>
                    <Link to="/pathfinding-visualizer">Pathfinding Visualizer</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
