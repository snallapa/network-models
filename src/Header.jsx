import React, {Component} from 'react';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {showDropdown: false};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        const dropdownClass = this.state.showDropdown ? "show" : "";
        const options = [{value: "ER", name:"Erdos Renyi Model"}, {value: "WS", name:"Watts Strogatz Model"}];
        return (
            <div className="header">
                <div className="header__model" onClick={this.onClick}>
                    <div className="header__model-text">
                        Network Models
                    </div>
                    <div className="header__model-arrow">
                        <div className="arrow"></div>
                    </div>
                    <div className={`header__model-dropdown ${dropdownClass}`}>
                        {options.map((option, idx) => 
                        <option onClick={() => this.props.onModeChange(option.value)} key={idx} value={option.value}>{option.name}</option>)
                        }
                    </div>

                </div>
                <div className="header__input">
                    <label>
                        Number of Nodes:
                    </label>
                    <input className="nodes" type="number" value={this.props.numberNodes} min="10" max="300" onChange={this.props.onNodesChange} />
                    <label>
                        {`Probability: ${this.props.p}%`}
                    </label>
                    <input className="prob" type="range" value={this.props.p} min="1" max="100" onChange={this.props.onProbChange} />
                </div>
            </div>
        );
    }

    onClick() {
        this.setState({showDropdown: !this.state.showDropdown});
    }
}

export default Header;