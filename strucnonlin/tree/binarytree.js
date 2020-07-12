class Node {
    constructor (value = null) {
        this.value = value
        this.left = null
        this.right = null
    }
}

const Russia = new Node(2018)
const Germany = new Node(2006)
const France = new Node(1998)
const Mexico = new Node(1986)

Russia.left = Germany
Russia.right = France
France.left = Mexico

//    '2018'   
//     /   \   
//  '2006' '1998'
//          /
//       '1986'