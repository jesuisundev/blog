unsortedArray = [2020, 1998, 2018, 1986, 2006]

def mergeSort(unsortedArray):
    # divide array until there's only one element
    # the recursive stop condition !
    if len(unsortedArray) > 1:
        # get the middle index of the current division
        middle = len(unsortedArray) // 2

        # get left side
        left = unsortedArray[:middle]

        # get right side
        right = unsortedArray[middle:]

        # call recursively for the left part of the data
        mergeSort(left)

        # call recursively for the left part of the data
        mergeSort(right)

        # default setup of the indexes
        leftIndex = rightIndex = globalIndex = 0

        # loop until we reach the end of the left or the right array
        # we can compare if there is only one element
        while leftIndex < len(left) and rightIndex < len(right):
            # actual sort comparaison is here
            # if the left element is smaller its should be first in the array
            # else the right element should be first
            # move indexes at each steps
            if left[leftIndex] < right[rightIndex]:
                unsortedArray[globalIndex] = left[leftIndex]
                leftIndex += 1
            else:
                unsortedArray[globalIndex] = right[rightIndex]
                rightIndex += 1
            globalIndex += 1

        # making sure that any element was not left behind during the process
        while leftIndex < len(left):
            unsortedArray[globalIndex] = left[leftIndex]
            leftIndex += 1
            globalIndex += 1

        while rightIndex < len(right):
            unsortedArray[globalIndex] = right[rightIndex]
            rightIndex += 1
            globalIndex += 1
    
    return unsortedArray

print(mergeSort(unsortedArray))