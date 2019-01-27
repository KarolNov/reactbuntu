import React, { Component } from 'react';


import Terminal from './components/Terminal';

import './styles/App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      directory: "~/Desktop",
      position: {
        terminal: {
          x: 60,
          y: 200
        }
      }
    }
    
  }


  render() {
    return (
      <div className="App">
          <div className="desktop">
            <Terminal directory={this.state.directory}/>
          </div>
      </div>
    );
  }
}

export default App;
