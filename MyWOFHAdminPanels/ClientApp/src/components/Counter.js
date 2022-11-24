import React, { Component } from 'react';

var request = require('../request.js');

 class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  componentDidMount(){
  }

  incrementCounter() {
   request.useQuery(null,'Test','Test').then(Request => {
    console.clear()
    console.log(Request)
   })
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={() => this.incrementCounter()}>Increment</button>
      </div>
    );
  }
}

export default  Counter;