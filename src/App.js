import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import SortingVisualizer from './SortingVisualizer';
import PathfindingVisualizer from './PathfindingVisualizer';

const App = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
                <Route path="/pathfinding-visualizer" element={<PathfindingVisualizer />} />
                <Route path="/" element={<div>Welcome to the visualizer!</div>} />
            </Routes>
        </Router>
    );
};

export default App;
