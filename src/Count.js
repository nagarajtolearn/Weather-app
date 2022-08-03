import React, { Component } from "react";

export default class Count extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <br />
        <button onClick={this.setState(this.state.count + 1)}>Click Me</button>
      </div>
    );
  }
}
