const unsortedArray = [2020, 1998, 2018, 1986, 2006]

const insertionSort = array => {
  for(let i = 0; i < array.length; i++) {
      const currentItem = array[i]
      let currentLeftIndex = i - 1

      while (currentLeftIndex >= 0 && array[currentLeftIndex] > currentItem) {
          array[currentLeftIndex + 1] = array[currentLeftIndex]
          currentLeftIndex --
      }

      array[currentLeftIndex + 1] = currentItem
  }

  return array
}

console.log(insertionSort(unsortedArray))
// [ 1986, 1998, 2006, 2018, 2020 ]