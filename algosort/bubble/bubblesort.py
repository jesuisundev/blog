unsortedArray = [2018, 1998, 1986, 2020, 2006]


def bubbleSort(arrayToSort):
    arrayIsSorted = False

    while arrayIsSorted is False:
        arrayIsSorted = True

        for i in range(len(arrayToSort) - 1):
            if (arrayToSort[i] > arrayToSort[i + 1]):
                tempLeftValue = arrayToSort[i]
                arrayToSort[i] = arrayToSort[i + 1]
                arrayToSort[i + 1] = tempLeftValue
                arrayIsSorted = False

    return arrayToSort


print(bubbleSort(unsortedArray))