from collections import deque 

class Graph():
    def __init__(self, adjacency_matrix):
        self.adjacency_matrix = adjacency_matrix


    def display(self):
        for row in self.adjacency_matrix:
            display_row = ''
            for value in row:
                display_row += str(value) + ' '
            print(display_row)


    def depth_first_search(self, start):
        # 1 - the stack to know where to go next
        stack = deque()
        # 1 - set to keep track of visited nodes.
        seen = list()

        # 2 - start the process by adding the first node to the stack
        stack.appendleft(start)

        # while the stack is not empty we have work to do
        while stack:
            # 3 - depile the stack with current node and do whatever we want todo
            currentNodeRow, currentNodeColumn = stack.popleft()

            # do what you need to do here
            # for our problem we just want to put X in the current node
            self.adjacency_matrix[currentNodeRow][currentNodeColumn] = 'X'

            # 4 - we've process this node, we need to remember we did
            seen.append((currentNodeRow, currentNodeColumn))

            # 5 - get the valid neighbors of the current
            for validAdjacentNode in self.validAdjacentNodes((currentNodeRow, currentNodeColumn), seen):
                # 5- push all of them in the stack for the next itération
                stack.appendleft(validAdjacentNode)


    def validAdjacentNodes(self, currentNode, seen):
        # directions where we gonna search for valid node to push in the stack
        # UP, DOWN, LEFT, RIGHT
        directions_offset = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        currentNodeRow, currentNodeColumn = currentNode

        # searching for valid node around the current node by updating coordinates at each iteration
        for row_offset, column_offset in directions_offset:
            next_row, next_col = (currentNodeRow + row_offset, currentNodeColumn + column_offset)

            # if the node is valid and not already seen we push it directly in the stack and continue
            if self.isValidNode(next_row, next_col) and (next_row, next_col) not in seen:
                yield (next_row, next_col)


    def isValidNode(self, row, column):
        # to be valid a node need to be
        # - inbound of the limit of the matrix
        # - equal to 0
        if column >= 0 and row >=0 and column < len(self.adjacency_matrix) and row < len(self.adjacency_matrix) and self.adjacency_matrix[row][column] == 0:
            return True
        return False


myGraph = Graph([
            [0,1,1,0,0],
            [1,1,0,0,0],
            [1,0,0,1,0],
            [1,1,0,1,1],
            [0,1,0,0,0]
          ])

print('Initial maze')
myGraph.display()

myGraph.depth_first_search((0,4))

print('Maze after DFS')
myGraph.display()
