class Node:
    def __init__(self, value = None):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None


    def __iter__(self):
        node = self.head

        while node is not None:
            yield node
            node = node.next


    def insertAtBegining(self, node):
        node.next = self.head
        self.head = node


    def isEmpty(self):
        if not self.head:
            return 1
        return 0


    def removeNode(self, node_to_remove):
        if self.head == node_to_remove:
            self.head = self.head.next
            return

        previous_node = self.head

        for node in self:
            if node == node_to_remove:
                previous_node.next = node.next
                return
            previous_node = node


myLinkedList = LinkedList()

firstNode = Node(1998)
secondNode = Node(2006)
badNode = Node(2020)
thirdNode = Node(2018)

secondNode.next = badNode
badNode.next = thirdNode

myLinkedList.head = secondNode

# insert operation
myLinkedList.insertAtBegining(firstNode)

# remove operation
myLinkedList.removeNode(badNode)

# front operation
print(myLinkedList.head.value)

# isEmpty operation
print(myLinkedList.isEmpty())

# show linked list
for node in myLinkedList:
    print(node.value)