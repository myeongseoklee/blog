const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[minIndex] > array[j]) minIndex = j;
    }

    if (i !== minIndex)
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }

  return array;
}

console.time('test');
selectionSort(array); // 0 1 2 3 4 5 6 7 8 9
console.timeEnd('test'); // 0.0102ms
