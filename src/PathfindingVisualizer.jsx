import React, { useState, useEffect } from 'react';

const EMPTY = 'EMPTY';
const START = 'START';
const END = 'END';
const WALL = 'WALL';
const VISITING = 'VISITING';

const createGrid = (numRows, numCols, start, end) => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if (i === start.row && j === start.col) {
                row.push(START);
            } else if (i === end.row && j === end.col) {
                row.push(END);
            } else {
                row.push(EMPTY);
            }
        }
        grid.push(row);
    }
    return grid;
};

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [numRows, setNumRows] = useState(0);
    const [numCols, setNumCols] = useState(0);
    const [startPos, setStartPos] = useState({ row: 0, col: 0 });
    const [endPos, setEndPos] = useState({ row: numRows - 1, col: numCols - 1 });
    const [draggingNode, setDraggingNode] = useState(null);
    const [algorithm, setAlgorithm] = useState('DFS');

    useEffect(() => {
        const updateSize = () => {
            const newNumRows = Math.floor((window.innerHeight - 200) / 25);
            const newNumCols = Math.floor((window.innerWidth - 40) / 25);

            setNumRows(newNumRows);
            setNumCols(newNumCols);

            setEndPos({ row: newNumRows - 1, col: newNumCols - 1 });
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setGrid(createGrid(numRows, numCols, startPos, endPos));
    }, [numRows, numCols, startPos, endPos]);

    const toggleCellState = (rowIdx, cellIdx) => {
        setGrid(grid => {
            return grid.map((row, rIdx) => {
                if (rIdx !== rowIdx) return row;
                return row.map((cell, cIdx) => {
                    if (cIdx !== cellIdx) return cell;
                    return cell === EMPTY ? WALL : EMPTY;
                });
            });
        });
    };

    const handleMouseDown = (rowIdx, cellIdx) => {
        const cell = grid[rowIdx][cellIdx];
        if (cell === START || cell === END) {
            setDraggingNode(cell);
        } else {
            toggleCellState(rowIdx, cellIdx);
        }
    };

    const handleMouseOver = (rowIdx, cellIdx) => {
        if (draggingNode === START) {
            setGrid(prevGrid => moveStartNode(prevGrid, { row: rowIdx, col: cellIdx }));
        } else if (draggingNode === END) {
            setGrid(prevGrid => moveEndNode(prevGrid, { row: rowIdx, col: cellIdx }));
        }
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const startPathfinding = async () => {
        if (algorithm === 'DFS') {
            const found = await dfs(grid, startPos, endPos, new Set(), setGrid);
            if (found) {
                alert('Path found!');
            } else {
                alert('No path found!');
            }
        }
    };
    
    

    const clearGrid = () => {
        setGrid(createGrid(numRows, numCols, startPos, endPos));
    };

    return (
        <div>
            <h2>Pathfinding Visualizer</h2>
            <div>
                <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
                    <option value="DFS">Depth-First Search</option>
                </select>
                <button onClick={startPathfinding}>Start</button>
                <button onClick={clearGrid}>Clear Grid</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 25px)` }}>
                {grid.map((row, rowIdx) => row.map((cell, cellIdx) => (
                    <div
                        key={`${rowIdx}-${cellIdx}`}
                        onMouseDown={() => handleMouseDown(rowIdx, cellIdx)}
                        onMouseOver={() => handleMouseOver(rowIdx, cellIdx)}
                        style={{
                            width: 25,
                            height: 25,
                            border: '1px solid black',
                            backgroundColor: cell === EMPTY ? 'white' : cell === WALL ? 'black' : cell === START ? 'green' : cell === END ? 'red' : cell === VISITING ? 'yellow' : 'white',
                        }}
                    />
                )))}
            </div>
        </div>
    );
};

function moveStartNode(grid, newStartPos) {
    return grid.map((row, rowIdx) => row.map((cell, cellIdx) => {
        if (cell === START) {
            return EMPTY;
        } else if (rowIdx === newStartPos.row && cellIdx === newStartPos.col) {
            return START;
        } else {
            return cell;
        }
    }));
}

function moveEndNode(grid, newEndPos) {
    return grid.map((row, rowIdx) => row.map((cell, cellIdx) => {
        if (cell === END) {
            return EMPTY;
        } else if (rowIdx === newEndPos.row && cellIdx === newEndPos.col) {
            return END;
        } else {
            return cell;
        }
    }));
}

async function dfs(grid, startPos, endPos, visited, setGrid) {
    if (startPos.row < 0 || startPos.row >= grid.length || startPos.col < 0 || startPos.col >= grid[0].length || grid[startPos.row][startPos.col] === WALL || visited.has(`${startPos.row}-${startPos.col}`)) {
        return false;
    }

    if (startPos.row === endPos.row && startPos.col === endPos.col) {
        return true;
    }

    visited.add(`${startPos.row}-${startPos.col}`);
    grid[startPos.row][startPos.col] = 'VISITING';
    setGrid(newGrid => newGrid.map((row, rIdx) => row.map((cell, cIdx) => {
        if (rIdx === startPos.row && cIdx === startPos.col) {
            return 'VISITING';
        } else {
            return cell;
        }
    })));

    await new Promise(resolve => setTimeout(resolve, 50));

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let direction of directions) {
        const newRow = startPos.row + direction[0];
        const newCol = startPos.col + direction[1];
        const found = await dfs(grid, { row: newRow, col: newCol }, endPos, visited, setGrid);
        if (found) {
            return true;
        }
    }

    grid[startPos.row][startPos.col] = EMPTY;
    setGrid(newGrid => newGrid.map((row, rIdx) => row.map((cell, cIdx) => {
        if (rIdx === startPos.row && cIdx === startPos.col) {
            return EMPTY;
        } else {
            return cell;
        }
    })));

    return false;
}



export default PathfindingVisualizer;
