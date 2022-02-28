
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    class Node {
        int id;
        int bitmask;

        public Node(int id, int bitmask) {
            this.id = id;
            this.bitmask = bitmask;
        }
    }

    int bitmaskAllNodesReached;
    int rows;
    int columns;

    public int shortestPathLength(int[][] graph) {
        if (graph.length == 1) {
            return 0;
        }
        rows = graph.length;
        columns = graph[0].length;
        bitmaskAllNodesReached = (1 << rows) - 1;

        return breadthFirstSearch(graph);
    }

    public int breadthFirstSearch(int[][] graph) {
        Queue<Node> queue = new LinkedList<>();
        initializeQueue(queue);
        boolean[][] visited = new boolean[rows][bitmaskAllNodesReached];
        initializeVisited(visited);
        int steps = 0;

        while (!queue.isEmpty()) {

            int sizeCurrentLevel = queue.size();
            while (sizeCurrentLevel-- > 0) {

                Node node = queue.poll();
                int[] neighbours = graph[node.id];

                for (int n : neighbours) {
                    int nextBitmask = node.bitmask | (1 << n);
                    if (nextBitmask == bitmaskAllNodesReached) {
                        return steps + 1;
                    }
                    if (!visited[n][nextBitmask]) {
                        visited[n][nextBitmask] = true;
                        queue.add(new Node(n, nextBitmask));
                    }
                }
            }
            steps++;
        }
        return -1;
    }

    public void initializeVisited(boolean[][] visited) {
        for (int i = 0; i < rows; i++) {
            int bitmask = (1 << i);
            visited[i][bitmask] = true;
        }
    }

    public void initializeQueue(Queue<Node> queue) {
        for (int i = 0; i < rows; i++) {
            int bitmask = (1 << i);
            queue.add(new Node(i, bitmask));
        }
    }
}
