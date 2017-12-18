import React, {Component} from 'react';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const dropdownClass = this.state.showDropdown
      ? "show"
      : "";
    const options = [
      {
        value: "ER",
        name: "Erdos Renyi Model"
      }, {
        value: "WS",
        name: "Watts Strogatz Model"
      }, {
        value: "BA",
        name: "Barabási-Albert"
      }
    ];
    return (<div className="header">
      <div className="header__model" onClick={this.onClick}>
        <div className="header__model-text">
          Network Models
        </div>
        <div className="header__model-arrow">
          <div className="arrow"></div>
        </div>
        <div className={`header__model-dropdown ${dropdownClass}`}>
          {
            options.map((option, idx) => <option className={option.value === this.props.selected
                ? "selected"
                : ""} onClick={() => this.props.onModeChange(option.value)} key={idx} value={option.value}>{option.name}</option>)
          }
        </div>

      </div>
      <div className="header__input">
        <label>
          Number of Nodes:
        </label>
        <input className="nodes" type="number" value={this.props.numberNodes} min="10" max="300" onChange={this.props.onNodesChange}/> {this.getModeSlider()}
      </div>
    </div>);
  }

  getModeSlider() {
    if (this.props.selected === "BA") {
      return [
        <label key="label">
          {`m: ${this.props.graphParameter}`}
        </label>,
        <input key="input" className="prob" type="range" value={this.props.graphParameter} min="1" max="10" onChange={this.props.onGraphParameterChange}/>
      ]
    }
    return [
      <label key="label">
        {`Probability: ${this.props.graphParameter}%`}
      </label>,
      <input key="input" className="prob" type="range" value={this.props.graphParameter} min="1" max="100" onChange={this.props.onGraphParameterChange}/>
    ]
  }

  onClick() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }
}

export default Header;
