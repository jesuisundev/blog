class Graph():
    def __init__(self, vertices):
        self.vertices = vertices
        self.adjacencyMatrix = []

        for _ in range(self.vertices):
            self.adjacencyMatrix.append([0 for i in range(self.vertices)])


    def add_edge(self, i, j):
        self.adjacencyMatrix[i][j] = 1
        self.adjacencyMatrix[j][i] = 1


    def display(self):
        for row in self.adjacencyMatrix:
            displayRow = ''
            for value in row:
                displayRow += str(value) + ' '
            print(displayRow)


myGraph = Graph(4)

myGraph.add_edge(0, 2)
myGraph.add_edge(1, 3)
myGraph.add_edge(2, 3)

myGraph.display()
# 0 0 1 0
# 0 0 0 1
# 1 0 0 1
# 0 1 1 0