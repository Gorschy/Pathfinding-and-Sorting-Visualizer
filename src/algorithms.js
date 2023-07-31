export const bubbleSort = (array, setArray, speed) => {
    let newArray = [...array];
    let animations = [];
  
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - 1 - i; j++) {
        if (newArray[j] > newArray[j + 1]) {
          animations.push([j, j + 1, true]);  // push a swap
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
        } else {
          animations.push([j, j + 1, false]);  // push a comparison
        }
      }
    }
  
    animations.forEach(([i, j, isSwap], index) => {
      setTimeout(() => {
        setArray(prevArray => {
          const newArray = [...prevArray];
          if (isSwap) {
            const temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
          }
          return newArray;
        });
      }, index * speed);
    });
  };
  
  function partition(array, start, end, animations) {
    let pivotIndex = start;
    let pivotValue = array[end];
    for(let i=start; i<end; i++) {
        animations.push([i, end, false]);
        if(array[i] < pivotValue) {
            animations.push([i, pivotIndex, true]);
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]]; // Swap elements
            pivotIndex++;
        }
    }
    animations.push([pivotIndex, end, true]);
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]]; // Swap pivot to the middle
    return pivotIndex;
}

function quickSortHelper(array, start, end, animations) {
    if(start >= end) {
        return;
    }
    let index = partition(array, start, end, animations);
    quickSortHelper(array, start, index - 1, animations);
    quickSortHelper(array, index + 1, end, animations);
}

export const quickSort = (array, setArray, speed) => {
    let animations = [];
    let newArray = [...array];
    quickSortHelper(newArray, 0, newArray.length - 1, animations);
    animations.forEach(([i, j, isSwap], index) => {
        setTimeout(() => {
            setArray(array => {
                let newArray = [...array];
                if(isSwap) {
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
                }
                return newArray;
            });
        }, index * speed);
    });
};


function buildMaxHeap(array, heapSize, animations) {
    for(let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapify(array, i, heapSize, animations);
    }
}

function heapify(array, i, heapSize, animations) {
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    let maximum = i;
    if(left < heapSize && array[left] > array[maximum]) {
        maximum = left;
    }
    if(right < heapSize && array[right] > array[maximum]) {
        maximum = right;
    }
    if(maximum !== i) {
        animations.push([i, maximum, true]);
        [array[i], array[maximum]] = [array[maximum], array[i]];
        heapify(array, maximum, heapSize, animations);
    }
}

export const heapSort = (array, setArray, speed) => {
    let animations = [];
    let newArray = [...array];
    let length = newArray.length;
    buildMaxHeap(newArray, length, animations);
    for(let i = length - 1; i > 0; i--) {
        animations.push([0, i, true]);
        [newArray[0], newArray[i]] = [newArray[i], newArray[0]];
        heapify(newArray, 0, i, animations);
    }
    animations.forEach(([i, j, isSwap], index) => {
        setTimeout(() => {
            setArray(array => {
                let newArray = [...array];
                if(isSwap) {
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            });
        }, index * speed);
    });
};

export const selectionSort = (array, setArray, speed) => {
    let animations = [];
    let newArray = [...array];
    let length = newArray.length;
    for(let i = 0; i < length - 1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < length; j++) {
            animations.push([minIndex, j, false]);
            if(newArray[j] < newArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push([i, minIndex, true]);
        [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
    }
    animations.forEach(([i, j, isSwap], index) => {
        setTimeout(() => {
            setArray(array => {
                let newArray = [...array];
                if(isSwap) {
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            });
        }, index * speed);
    });
};

export const insertionSort = (array, setArray, speed) => {
    let animations = [];
    let newArray = [...array];
    let length = newArray.length;
    for(let i = 1; i < length; i++) {
        let key = newArray[i];
        let j = i - 1;
        animations.push([i, j, false]);
        while(j >= 0 && newArray[j] > key) {
            animations.push([j, j + 1, true]);
            newArray[j + 1] = newArray[j];
            j = j - 1;
        }
        newArray[j + 1] = key;
    }
    animations.forEach(([i, j, isSwap], index) => {
        setTimeout(() => {
            setArray(array => {
                let newArray = [...array];
                if(isSwap) {
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            });
        }, index * speed);
    });
};

