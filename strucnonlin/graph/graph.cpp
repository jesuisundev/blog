#include <iostream>

using namespace std;

class Graph {
    private:
        int vertices;
        int** adjacencyMatrix;

    public:
        Graph(int vertices) {
            this->vertices = vertices;
            adjacencyMatrix = new int*[vertices];

            for (int i = 0; i < vertices; i++) {
                adjacencyMatrix[i] = new int[vertices];
                for (int j = 0; j < vertices; j++)
                    adjacencyMatrix[i][j] = false;
            }
        }

    void addEdge(int i, int j) {
        adjacencyMatrix[i][j] = true;
        adjacencyMatrix[j][i] = true;
    }

    void display() {
        for (int i = 0; i < vertices; i++) {
            for (int j = 0; j < vertices; j++)
                cout << adjacencyMatrix[i][j] << " ";
            cout << "\n";
        }
    }
};

int main() {
    Graph myGraph(4);

    myGraph.addEdge(0, 2);
    myGraph.addEdge(1, 3);
    myGraph.addEdge(2, 3);

    myGraph.display();
    // 0 0 1 0
    // 0 0 0 1
    // 1 0 0 1
    // 0 1 1 0
}