import {createErdosRenyi, createWattsStrogatz, createBarabasiAlbert} from "./models";
import React from 'react';
import Graph from "./Graph";
function createGraph(WrappedComponent, createEdges) {
    return class extends React.Component {
        render() {
            let nodes = [];
            for (let i = 0; i < this.props.numberNodes; i++) {
                nodes.push({id: i, degree: 0});
            }
            const edges = createEdges(nodes, this.props.graphParameter);
            const charge = -1 * (nodes.length * nodes.length) / (edges.length) * 5;
            return <WrappedComponent nodes={nodes} edges={edges} charge={charge} />
        }
    }
}

export const ErdosRenyiGraph = createGraph(Graph, createErdosRenyi);
export const WattsStrogatz = createGraph(Graph, createWattsStrogatz);
export const BarabasiAlbert = createGraph(Graph, createBarabasiAlbert);
