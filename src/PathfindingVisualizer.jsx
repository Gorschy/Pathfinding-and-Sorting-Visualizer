import React, { useState, useEffect } from 'react';

// Cell types
const EMPTY = 'EMPTY';
const START = 'START';
const END = 'END';
const WALL = 'WALL';

// Create an initial grid
const createGrid = (numRows, numCols) => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            row.push(EMPTY);
        }
        grid.push(row);
    }
    return grid;
};

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [numRows, setNumRows] = useState(0);
    const [numCols, setNumCols] = useState(0);

    // Calculate the number of rows and columns based on the viewport size.
    useEffect(() => {
        const updateSize = () => {
            setNumRows(Math.floor(window.innerHeight / 25));
            setNumCols(Math.floor(window.innerWidth / 25));
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setGrid(createGrid(numRows, numCols));
    }, [numRows, numCols]);

    return (
        <div>
            <h2>Pathfinding Visualizer</h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 25px)` }}>
                {grid.map((row, rowIdx) => row.map((cell, cellIdx) => (
                    <div
                        key={`${rowIdx}-${cellIdx}`}
                        style={{
                            width: 25,
                            height: 25,
                            border: '1px solid black',
                            backgroundColor: cell === EMPTY ? 'white' : cell === WALL ? 'black' : cell === START ? 'green' : cell === END ? 'red' : 'white',
                        }}
                    />
                )))}
            </div>
        </div>
    );
};

export default PathfindingVisualizer;
