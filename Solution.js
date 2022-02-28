
/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function (graph) {
    if (graph.length === 1) {
        return 0;
    }
    this.rows = graph.length;
    this.columns = graph[0].length;
    this.bitmaskAllNodesReached = (1 << rows) - 1;

    return breadthFirstSearch(graph);
};

/**
 * @param {number[][]} graph
 * @return {number}
 */
function breadthFirstSearch(graph) {
    const queue = new Queue();
    initializeQueue(queue);
    const visited = new Array(this.rows);
    initializeVisited(visited);

    let steps = 0;
    while (!queue.isEmpty()) {

        let sizeCurrentLevel = queue.size();
        while (sizeCurrentLevel-- > 0) {

            const node = queue.dequeue();
            const neighbours = graph[node.id];

            for (let n of neighbours) {
                let nextBitmask = node.bitmask | (1 << n);
                if (nextBitmask === this.bitmaskAllNodesReached) {
                    return steps + 1;
                }
                if (!visited[n][nextBitmask]) {
                    visited[n][nextBitmask] = true;
                    queue.enqueue(new Node(n, nextBitmask));
                }
            }
        }
        steps++;
    }
    return -1;
}

/**
 * @param {number} id
 * @param {number} bitmask
 */
function Node(id, bitmask) {
    this.id = id;
    this.bitmask = bitmask;
}

/**
 * @param {boolean[][]} visited
 */
function initializeVisited(visited) {
    for (let i = 0; i < this.rows; i++) {
        visited[i] = new Array(this.bitmaskAllNodesReached).fill(false);
        let bitmask = (1 << i);
        visited[i][bitmask] = true;
    }
}

/**
 * @param {Queue Node} queue
 */
function initializeQueue(queue) {
    for (let i = 0; i < this.rows; i++) {
        let bitmask = (1 << i);
        queue.enqueue(new Node(i, bitmask));
    }
}
