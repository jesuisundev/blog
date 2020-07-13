class Graph {
    constructor(vertices) {
        this.vertices = vertices
        this.adjacencyMatrix = []

        for (var i = 0; i < this.vertices; i++) { 
            this.adjacencyMatrix[i] = new Array(this.vertices).fill(0) 
        }
    }

    addEdge(i, j) {
        this.adjacencyMatrix[i][j] = 1
        this.adjacencyMatrix[j][i] = 1
    }

    display() {
        for(const row of this.adjacencyMatrix) {
            let displayRow = ''
            for(const value of row) {
                displayRow += value + ' '
            }
            console.log(displayRow)
        }
    }
}

myGraph = new Graph(4)

myGraph.addEdge(0, 2)
myGraph.addEdge(1, 3)
myGraph.addEdge(2, 3)

myGraph.display()
// 0 0 1 0
// 0 0 0 1
// 1 0 0 1
// 0 1 1 0