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
            return <WrappedComponent nodes={nodes} edges={createEdges(nodes, this.props.p)} />
        }
    }
}

export const ErdosRenyiGraph = createGraph(Graph, createErdosRenyi);
export const WattsStrogatz = createGraph(Graph, createWattsStrogatz);