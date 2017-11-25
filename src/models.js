function randomNumberBetween0And100() {
    return Math.floor(Math.random() * 100);
}

function randomNode(numberOfNodes) {
    return Math.floor((Math.random() * numberOfNodes));
}

/**
 * An erdos renyi graph is a graph where every two nodes has a probability p
 * of being connected. To generate, go through every node and try connecting it
 * with every other node
 * @param {Array} nodes the array of nodes
 * @param {Integer} p between 0 and 100 probability 
 */
export function createErdosRenyi(nodes, p) {
    let edges = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (randomNumberBetween0And100() < p) {
                edges.push({source: nodes[i], target: nodes[j]});
            }
        }
    }
    return edges;
}

/**
 * a watts strogatz graph is created by connecting every node with their neighbors
 * and then taking an edge and reassigning with probability p. 
 * @param {*} nodes the array of nodes
 * @param {*} p between 0 and 100 probability
 */
export function createWattsStrogatz(nodes, p) {
    let edges = [];
    const numberOfNodes = nodes.length;
    for (let i = 0; i < numberOfNodes; i++) {
        edges.push({source: nodes[i], target: nodes[(i + 1) % numberOfNodes], value: Math.sqrt(0.5)});
        edges.push({source: nodes[i], target: nodes[(i + 2) % numberOfNodes], value: Math.sqrt(0.5)});
    }
    for (let i = 0; i < edges.length; i++) {
        if (randomNumberBetween0And100() < p) {
            edges[i].target = nodes[randomNode(nodes.length)];
        }
    }
    return edges;
}