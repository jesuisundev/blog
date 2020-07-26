from collections import deque 

class Graph():
    def __init__(self, adjacency_matrix):
        self.adjacency_matrix = adjacency_matrix


    def breadth_first_search(self, start, destination):
        queue = deque()
        deja_vu = list()

        queue.append(start)

        while queue:
            currentNodeRow, currentNodeColumn = queue.popleft()

            if destination == (currentNodeRow, currentNodeColumn):
                return True

            deja_vu.append((currentNodeRow, currentNodeColumn))

            for validAdjacentNode in self.validAdjacentNodes((currentNodeRow, currentNodeColumn), deja_vu):
                queue.append(validAdjacentNode)

        return False


    def validAdjacentNodes(self, currentNode, deja_vu):
        # UP, DOWN, LEFT, RIGHT
        directions_offset = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        currentNodeRow, currentNodeColumn = currentNode

        # searching for valid node around the current node 
        # by updating coordinates at each iteration
        for row_offset, column_offset in directions_offset:
            next_row, next_col = (currentNodeRow + row_offset, currentNodeColumn + column_offset)

            # if the node is valid and not already deja_vu 
            # we push it directly in the queue and continue
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


start = (0, 4)
destination = (4, 4)
print(myGraph.breadth_first_search(start, destination))
# True

start = (0, 4)
destination = (4, 0)
print(myGraph.breadth_first_search(start, destination))
# False