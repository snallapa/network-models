function randomNumberBetween0And100() {
  return Math.floor(Math.random() * 100);
}

function randomNode(numberOfNodes) {
  return Math.floor((Math.random() * numberOfNodes));
}

function chooseWithWeight(probabilities) {
  const sum = probabilities.reduce((total, num) => total + num);
  const roll = Math.floor(Math.random() * sum) + 1;
  let currentSum = 0;
  for (let i = 0; i < probabilities.length; i++) {
    let prob = probabilities[i];
    currentSum = prob + currentSum;
    if (currentSum >= roll) {
      return i;
    }
  }
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
    edges.push({
      source: nodes[i],
      target: nodes[(i + 1) % numberOfNodes]
    });
    edges.push({
      source: nodes[i],
      target: nodes[(i + 2) % numberOfNodes]
    });
  }
  for (let i = 0; i < edges.length; i++) {
    if (randomNumberBetween0And100() < p) {
      edges[i].target = nodes[randomNode(nodes.length)];
    }
  }
  return edges;
}

export function createBarabasiAlbert(nodes, m=2) {
  if (nodes.length < 2) {
    return [];
  }
  nodes[0].degree = 1;
  nodes[1].degree = 1;
  const edges = [
    {
      source: nodes[0],
      target: nodes[1]
    }
  ];
  for (let i = 2; i < nodes.length; i++) {
    const chosenSoFar = [];
    for (let j = 0; j < Math.min(m, i); j++) {
      const chosenNode = chooseWithWeight(nodes.slice(0, i).map((node) => node.degree));
      if (chosenSoFar.includes(chosenNode)) {
        continue;
      }
      edges.push({source: nodes[i], target: nodes[chosenNode]});
      chosenSoFar.push(chosenNode);
      nodes[chosenNode].degree++;
      nodes[i].degree++;
    }
  }

  return edges;
}
