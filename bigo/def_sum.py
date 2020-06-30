def getSumO1(input):
    return input * (input + 1) / 2


def getSumOn(input):
    sum = 0

    for number in range(1, input + 1):
        sum += number

    return sum


def exempleO1(n):
    print(n + n)


def exempleOlogn(n):
    i = 1

    while(i < n):
        i = i * 2
        print(i)


def exempleOn(n):
    for number in range(n):
        print(number + 1)



def exempleOn2(n):
    for number in range(n):
        for number in range(n):
            print(number + 1)


input = 1000


output = exempleOn2(input)

if(output):
    print(output)