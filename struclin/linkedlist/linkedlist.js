class Node {
    constructor (value = null) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor () {
        this.head = null
    }

    * nodes() {
        let node = this.head

        while (node != null){
            yield node
            node = node.next
        }
    }

    insertAtBegining(node) {
        node.next = this.head
        this.head = node
    }

    isEmpty() {
        if(!this.head) return 1

        return 0
    }

    removeNode(nodeToRemove) {
        if (this.head === nodeToRemove) {
            this.head = this.head.next
            return
        }

        let previous_node = this.head

        for(let node of this.nodes()) {
            if (node === nodeToRemove) {
                previous_node.next = node.next
                return
            }

            previous_node = node
        }
    }
}

const myLinkedList = new LinkedList()

firstNode = new Node(1998)
secondNode = new Node(2006)
badNode = new Node(2020)
thirdNode = new Node(2018)

secondNode.next = badNode
badNode.next = thirdNode

myLinkedList.head = secondNode

// insert operation
myLinkedList.insertAtBegining(firstNode)

// remove operation
myLinkedList.removeNode(badNode)

// front operation
console.log(myLinkedList.head.value)

// isEmpty operation
console.log(myLinkedList.isEmpty())

// show linked list
for(let node of myLinkedList.nodes()) {
    console.log(node.value)
}