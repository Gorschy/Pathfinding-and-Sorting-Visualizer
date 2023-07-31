import React, { useState, useEffect } from 'react';
import { bubbleSort, quickSort, heapSort, selectionSort, insertionSort } from './algorithms.js';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
    const [data, setData] = useState([]);
    const [algorithm, setAlgorithm] = useState('Bubble Sort');
    const [speed, setSpeed] = useState(100);
  
    const generateArray = () => {
      const arr = Array.from({ length: 50 }, () => Math.floor(Math.random() * 500));
      setData(arr);
    };
  
    useEffect(() => {
      generateArray();
    }, []);
  
    const startSorting = () => {
        switch (algorithm) {
            case 'Bubble Sort':
                bubbleSort(data, setData, speed);
                break;
            case 'Quick Sort':
                quickSort(data, setData, speed);
                break;
            case 'Heap Sort':
                heapSort(data, setData, speed);
                break;
            case 'Selection Sort':
                selectionSort(data, setData, speed);
                break;
            case 'Insertion Sort':
                insertionSort(data, setData, speed);
                break;
            // case for other sorting algorithms...
            default:
                break;
        }
    };
  
    return (
        <div>
            <h2>Sorting Visualizer</h2>
            <div className="sortingVisualizer">
                {data.map((value, idx) => (
                    <div key={idx} className="bar" style={{ height: `${value}px` }} />
                ))}
            </div>
            <button onClick={generateArray}>Generate New Array</button>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="Bubble Sort">Bubble Sort</option>
                <option value="Quick Sort">Quick Sort</option>
                <option value="Heap Sort">Heap Sort</option>
                <option value="Selection Sort">Selection Sort</option>
                <option value="Insertion Sort">Insertion Sort</option>
                {/* Add other sorting algorithms here */}
            </select>
            <input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(e.target.value)} />
            <button onClick={startSorting}>Start Sorting</button>
        </div>
    );
};

export default SortingVisualizer;
