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
        stack = deque() # 1
        deja_vu = list() # 1

        stack.appendleft(start) # 2

        while stack: # 3
            currentNodeRow, currentNodeColumn = stack.popleft() # 4

            self.adjacency_matrix[currentNodeRow][currentNodeColumn] = 'X' # 5

            deja_vu.append((currentNodeRow, currentNodeColumn))  # 6

            for validAdjacentNode in self.validAdjacentNodes((currentNodeRow, currentNodeColumn), deja_vu): # 7
                stack.appendleft(validAdjacentNode) # 8


    def validAdjacentNodes(self, currentNode, deja_vu):
        # UP, DOWN, LEFT, RIGHT
        directions_offset = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        currentNodeRow, currentNodeColumn = currentNode

        # searching for valid node around the current node 
        # by updating coordinates at each iteration
        for row_offset, column_offset in directions_offset:
            next_row, next_col = (currentNodeRow + row_offset, currentNodeColumn + column_offset)

            # if the node is valid and not already deja_vu 
            # we push it directly in the stack and continue
            if self.isValidNode(next_row, next_col) and (next_row, next_col) not in deja_vu:
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

# Initial maze
# 0 1 1 0 0 
# 1 1 0 0 0 
# 1 0 0 1 0 
# 1 1 0 1 1 
# 0 1 0 0 0 
# Maze after DFS
# 0 1 1 X X 
# 1 1 X X X 
# 1 X X 1 X 
# 1 1 X 1 1 
# 0 1 X X X 