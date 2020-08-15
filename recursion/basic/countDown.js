function countDown (number) {
  if (number <= 0) {
    return
  }

  console.log(number)
  countDown(number - 1)
}

countDown(3)
//3
//2
//1