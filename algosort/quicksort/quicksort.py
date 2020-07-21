def quickSort(arrayToSort):
    # if there is no smaller or bigger values we have nothing to sort anymore, array is sorted !
    # the recursive stop condition
    if not arrayToSort:
        return []
    else:
        # if we have value to sort we choose a pivot
        # here we just getting the last element of the array
        pivot = arrayToSort[-1]

        # we go through the current array and build an array of smaller values of the pivot
        arrayOfSmallerValues = [value for value in arrayToSort if value < pivot]

        # we go through the current array (minus the pivot) and build an array of bigger values of the pivot
        arrayOfBiggerValues = [value for value in arrayToSort[:-1] if value >= pivot]

        # we return the current iteration with a new array
        # smaller values at the beggining, pivot in the middle, bigger values in the end
        return quickSort(arrayOfSmallerValues) + [pivot] + quickSort(arrayOfBiggerValues)

print(quickSort([2018, 1998, 1986, 2020, 2006]))