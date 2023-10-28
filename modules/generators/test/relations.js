class RelationGraph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, []);
        } else {
            console.log(`Node ${node} already exists in the graph.`);
        }
    }

    addEdge(node1, node2, relationship) {
        if (this.nodes.has(node1) && this.nodes.has(node2)) {
            this.nodes.get(node1).push({ node: node2, relationship });
        } else {
            console.log("One or both of the nodes do not exist in the graph.");
        }
    }

    addTwoWayEdge(node1, node2, relationship) {
        if (this.nodes.has(node1) && this.nodes.has(node2)) {
            this.nodes.get(node1).push({ node: node2, relationship });
            this.nodes.get(node2).push({ node: node1, relationship });
        } else {
            console.log("One or both of the nodes do not exist in the graph.");
        }
    }
    getNeighbors(node) {
        return this.nodes.get(node);
    }

    printAllRelationships() {
        for (const [node, neighbors] of this.nodes.entries()) {
            neighbors.forEach(neighbor => {
                console.log(`${node} ${neighbor.relationship} ${neighbor.node}`);
            });
        }
    }
}