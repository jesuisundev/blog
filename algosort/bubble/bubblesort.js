const unsortedArray = [2020, 1998, 2018, 1986, 2006]

const bubbleSort = array => {
  const arrayLength = array.length
  let isSwapped

  do {
    isSwapped = false

    for (let i = 0; i < arrayLength; i++) {
      if (array[i] > array[i + 1]) {
        const tempLeftValue = array[i]
        array[i] = array[i + 1]
        array[i + 1] = tempLeftValue

        isSwapped = true
      }
    }
  } while (isSwapped)

  return array
}

console.log(bubbleSort(unsortedArray))
// [ 1986, 1998, 2006, 2018, 2020 ]
