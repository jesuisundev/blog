class Node:
    def __init__(self, value = None):
        self.value = value
        self.left = None
        self.right = None


Russia = Node(2018)
Germany = Node(2006)
France = Node(1998)
Mexico = Node(1986)

Russia.left = Germany
Russia.right = France
France.left = Mexico

#    '2018'   
#     /   \   
#  '2006' '1998'
#          /
#       '1986'