unsortedArray = [2018, 1998, 1986, 2020, 2006]

def insertionSort(arrayToSort):
    for index in range(1, len(arrayToSort)):
        currentItem = arrayToSort[index]
        currentLeftIndex = index - 1

        while currentLeftIndex >= 0 and arrayToSort[currentLeftIndex] > currentItem:
            arrayToSort[currentLeftIndex + 1] = arrayToSort[currentLeftIndex] 
            currentLeftIndex -= 1

        arrayToSort[currentLeftIndex + 1] = currentItem

    return arrayToSort

print(insertionSort(unsortedArray))
# [1986, 1998, 2006, 2018, 2020]