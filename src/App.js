import uniqid from 'uniqid';
import React, { Component } from 'react';


import Terminal from './components/Terminal/Terminal';
import Icon from './components/Icon/Icon';

import './styles/App.scss';

class App extends Component {

  state = {
    directory: "~/Desktop",
    iconSize: 64,
    windows: {
      terminal: [
        {
          key: uniqid(),
          x: 60,
          y: 200
        }
      ]
    }
  }

  toggleWindow = (key, id) => {
    let array = [...this.state.windows[key]];
    let i = array.findIndex(el=>el.key===id);
    array.splice(i, 1);
    this.setState({
      windows: {
        ...this.state.windows,
        [key]: array
      }
    })
  }

  openWindow = (key) => {
    console.log(key);
    this.setState({
      windows:{
        ...this.state.windows,
        [key]: this.state.windows[key].concat({
          key: uniqid(),
          x: 60,
          y: 200
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="desktop">
          <Icon name="terminal" size={this.state.iconSize} onDoubleClick={this.openWindow}/>
          {
            this.state.windows.terminal.map((el, i)=>
              <Terminal key={el.key} id={el.key} position={el} directory={this.state.directory} toggle={this.toggleWindow} />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
