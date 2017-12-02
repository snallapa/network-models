import {createErdosRenyi, createWattsStrogatz} from "./models";
import React from 'react';
import Graph from "./Graph";
function createGraph(WrappedComponent, createEdges) {
    return class extends React.Component {
        render() {
            let nodes = [];
            for (let i = 0; i < this.props.numberNodes; i++) {
                nodes.push({id: i});
            }
            const edges = createEdges(nodes, this.props.p);
            const charge = -1 * (nodes.length * nodes.length) / (edges.length) * 5;
            console.log(charge);
            return <WrappedComponent nodes={nodes} edges={edges} charge={charge} />
        }
    }
}

export const ErdosRenyiGraph = createGraph(Graph, createErdosRenyi);
export const WattsStrogatz = createGraph(Graph, createWattsStrogatz);