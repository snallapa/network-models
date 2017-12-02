import React, { Component } from 'react';
import './App.css';
import {ErdosRenyiGraph, WattsStrogatz} from './NetworkModels';
import Header from "./Header";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {mode: "ER", numberNodes: 25, p: 20};
    this.onModeChange = this.onModeChange.bind(this);
    this.onNodesChange = this.onNodesChange.bind(this);
    this.onProbChange = this.onProbChange.bind(this);
  }

  render() {
    return (
    <div className="App">
      <Header onProbChange={this.onProbChange} onNodesChange={this.onNodesChange} onModeChange={this.onModeChange} numberNodes={this.state.numberNodes} p={this.state.p}/>
      {this.renderModel()}
    </div>
    );
  }

  onNodesChange(event) {
    this.setState({...this.state, numberNodes: event.target.value});
  }

  onProbChange(event) {
    this.setState({...this.state, p: event.target.value});
  }

  onModeChange(value) {
    this.setState({...this.state, mode: value});
  }

  renderModel() {
    const {mode, numberNodes, p} = this.state;
    if (mode === "ER") {
      return <ErdosRenyiGraph numberNodes={numberNodes} p={p} />
    } else if (mode === "WS") {
      return <WattsStrogatz numberNodes={numberNodes} p={p} />
    }
  }
}

export default App;
