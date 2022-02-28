
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Node {
        int id;
        int bitmask;

        Node(int id, int bitmask) {
            this->id = id;
            this->bitmask = bitmask;
        }
    };

    int bitmaskAllNodesReached;
    int rows;
    int columns;

public:

    int shortestPathLength(vector<vector<int>>&graph) {
        if (graph.size() == 1) {
            return 0;
        }
        rows = graph.size();
        columns = graph[0].size();
        bitmaskAllNodesReached = (1 << rows) - 1;
        return breadthFirstSearch(graph);
    }

    int breadthFirstSearch(vector<vector<int>>&graph) {
        queue<Node> queue;
        initializeQueue(queue);
        vector < vector<bool>> visited(rows, vector<bool>(bitmaskAllNodesReached, false));
        initializeVisited(visited);
        int steps = 0;

        while (!queue.empty()) {

            int sizeCurrentLevel = queue.size();
            while (sizeCurrentLevel-- > 0) {

                Node node = queue.front();
                queue.pop();
                vector<int> neighbours = graph[node.id];

                for (const auto& n : neighbours) {
                    int nextBitmask = node.bitmask | (1 << n);
                    if (nextBitmask == bitmaskAllNodesReached) {
                        return steps + 1;
                    }
                    if (!visited[n][nextBitmask]) {
                        visited[n][nextBitmask] = true;
                        queue.push(Node(n, nextBitmask));
                    }
                }
            }
            steps++;
        }
        return -1;
    }

    void initializeVisited(vector<vector<bool>>&visited) {
        for (int i = 0; i < rows; i++) {
            int bitmask = (1 << i);
            visited[i][bitmask] = true;
        }
    }

    void initializeQueue(queue<Node>& queue) {
        for (int i = 0; i < rows; i++) {
            int bitmask = (1 << i);
            queue.push(Node(i, bitmask));
        }
    }
};
