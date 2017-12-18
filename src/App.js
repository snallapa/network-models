import React, {Component} from 'react';
import './App.css';
import {ErdosRenyiGraph, WattsStrogatz, BarabasiAlbert} from './NetworkModels';
import Header from "./Header";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "ER",
      numberNodes: 25,
      graphParameter: 20
    };
    this.onModeChange = this.onModeChange.bind(this);
    this.onNodesChange = this.onNodesChange.bind(this);
    this.onGraphParameterChange = this.onGraphParameterChange.bind(this);
  }

  render() {
    return (<div className="App">
      <Header onGraphParameterChange={this.onGraphParameterChange} onNodesChange={this.onNodesChange} onModeChange={this.onModeChange} numberNodes={this.state.numberNodes} graphParameter={this.state.graphParameter} selected={this.state.mode}/> {this.renderModel()}
    </div>);
  }

  onNodesChange(event) {
    this.setState({
      ...this.state,
      numberNodes: event.target.value
    });
  }

  onGraphParameterChange(event) {
    this.setState({
      ...this.state,
      graphParameter: event.target.value
    });
  }

  onModeChange(value) {
    const graphParameter = value === "BA" ? 2 : 20;
    this.setState({
      ...this.state,
      mode: value,
      numberNodes: 25,
      graphParameter: graphParameter
    });
  }

  renderModel() {
    const {mode, numberNodes, graphParameter} = this.state;
    switch (mode) {
      case "ER":
        return <ErdosRenyiGraph numberNodes={numberNodes} graphParameter={graphParameter}/>
      case "WS":
        return <WattsStrogatz numberNodes={numberNodes} graphParameter={graphParameter}/>
      case "BA":
        return <BarabasiAlbert numberNodes={numberNodes} graphParameter={graphParameter}/>
      default:
        return <ErdosRenyiGraph numberNodes={numberNodes} graphParameter={graphParameter}/>
    }
  }
}

export default App;
