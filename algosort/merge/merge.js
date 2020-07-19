const mergeSort = array => {
  // divide array until there's only one element
  // the recursive stop condition !
  if (array.length > 1) {
    // get the middle index of the current division
    const middleIndex = Math.floor(array.length / 2)
    // get left side
    const leftSide = array.slice(0, middleIndex)
    // get right side
    const rightSide = array.slice(middleIndex)

    // call recursively for the left part of the data
    mergeSort(leftSide)
    // call recursively for the right part of the data
    mergeSort(rightSide)

    // default setup of the indexes
    let leftIndex = 0, rightIndex = 0, globalIndex = 0

    // loop until we reach the end of the left or the right array
    // we can't compare if there is only one element
    while(leftIndex < leftSide.length && rightIndex < rightSide.length) {
      // actual sort comparaison is here
      // if the left element is smaller its should be first in the array
      // else the right element should be first
      // move indexes at each steps
      if (leftSide[leftIndex] < rightSide[rightIndex]) {
        array[globalIndex] = leftSide[leftIndex]
        leftIndex++
      } else {
        array[globalIndex] = rightSide[rightIndex]
        rightIndex++
      }
      globalIndex++
    }

    // making sure that any element was not left behind during the process
    while(leftIndex < leftSide.length) {
      array[globalIndex] = leftSide[leftIndex]
      leftIndex++
      globalIndex++
    }

    while(rightIndex < rightSide.length) {
      array[globalIndex] = rightSide[rightIndex]
      rightIndex++
      globalIndex++
    }
  }

  return array
}

console.log(mergeSort([2020, 1998, 2018, 1986, 2006]))
