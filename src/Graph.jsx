import React, { Component } from 'react';
import {select, forceSimulation, forceCenter, forceManyBody, 
    forceLink, drag, event} from 'd3';
import {scaleOrdinal, schemeCategory20} from "d3-scale";

class Graph extends Component {

    componentDidMount() {
        this.createGraph()
     }
     componentDidUpdate() {
        this.createGraph()
     }

     createGraph() {
        const color = scaleOrdinal(schemeCategory20);
        const radius = 5;
        const svg = select(this.node);
        const width = +svg.attr("width");
        const height = +svg.attr("height");
        let nodes = select(this.nodeG).selectAll("circle");
        let links = select(this.linkG).selectAll("line");
        const dragstarted = (d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          };
      
          const dragged = (d) => {
            d.fx = event.x;
            d.fy = event.y;
          };
      
          const dragended = (d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          };
          nodes = nodes.data(this.props.nodes);
          nodes.attr("fill", () => color(Math.random() * 100));
          nodes.enter().append("circle")
          .attr("r", radius)
          .attr("fill", () => color(Math.random() * 100))
          .call(drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
          .merge(nodes);
          nodes.exit().remove();
          links = links.data(this.props.edges);
          links.exit().remove();
          links.enter().append("line")
          .attr("stroke", "gray")
          .attr("stroke-opacity", 0.4);

          const simulation = forceSimulation().force("link", forceLink().id(function(d) { return 4; }))
          .force("center", forceCenter(width / 2, height / 2))
          .force("many-body", forceManyBody().strength(() => {
              return -300;
          }));
          const lines = svg.selectAll("line");
          const circles = svg.selectAll("circle");
          
          simulation.nodes(this.props.nodes).on("tick", () => {
            lines.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);
            circles
            .attr("cx", (d) => Math.max(radius, Math.min(width - radius, d.x)))
            .attr("cy", (d) =>  Math.max(radius, Math.min(height - radius, d.y)));
          });
          simulation.force("link").links(this.props.edges);
     }

    render() {
        return (
        <svg ref={node => this.node = node} width={800} height={650} viewBox="0,0,960,600">
          <g className="nodes" ref={nodeG => this.nodeG = nodeG}></g>
          <g className="links" ref={linkG => this.linkG = linkG}></g>
        </svg>
        )
    }

    
}

export default Graph;