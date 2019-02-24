import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

import { commandsOutput } from '../variables';
import '../styles/Terminal.scss';
import { cpus } from 'os';

class Terminal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            command: "help",
            commandsArchive: [],
            terminal: {
                scrolling: true
            }
        }
        this.getKey = this.getKey.bind(this);
    }

    getKey(e) {
        let key = e.key;
        let command = this.state.command;
        console.log(key);
        if (key === 'Backspace') {
            command = command.slice(0, command.length - 1);
        } else if (key === 'Enter') {
            this.setState({
                command: command
            })
            this.fireCommand()
        } else if(key.length===1) {
            command += key;
        }
        this.setState({
            command: command
        })
    }

    fireCommand() {
        let commandsArchive = this.state.commandsArchive;
        let output = commandsOutput[this.state.command];
        if (!output) {
            output = `${this.state.command}: command not found`
        }
        let commandObj = {
            command: this.state.command,
            output: output
        }
        commandsArchive.push(commandObj);

        let archive = [];
        for (let i = 0; i < commandsArchive.length; i++) {
            let prompt = [];
            prompt.push(<span className="user">karol@ubuntu</span>);
            prompt.push(":");
            prompt.push(<span className="location">{this.props.directory}</span>);
            prompt.push("$");
            prompt.push(<span className="command">{this.state.commandsArchive[i].command}</span>);
            let output = commandsArchive[i].output.split("\n");
            archive.push(<div className={"prompt"}>{prompt}</div>);
            let multiline = [];
            output.forEach(line=>{
                multiline.push(<p>{line}<br/></p>)
            })
            archive.push(<div>{multiline}</div>);
        }

        let terminalArchive = [];
        terminalArchive.push(<div style={{ width: '100%' }}>{archive}</div>);
        this.setState({
            command: "",
            commandsArchive: commandsArchive,
            terminalArchive: terminalArchive
        });
    }

    maximize(){
        this.setState({
            height: "100%",
            width: "100%",
            maximized: !this.state.maximized
        })
    }

    render() {
        return (
            <Rnd bounds="window" default={{
                x: 100,
                y: 200,
                width: 500,
                height: 300
            }} minWidth={250} minHeight={200}
            disableDragging={!this.state.terminal.drag}
            size={this.state.maximized ? {
                width: this.state.width,
                height: this.state.height
            } : null}
            position={this.state.maximized ? {
                x: 0,
                y: 0
            } : null}
            onResize={(e)=>console.log(e)}
            >
                <div className="terminal" onKeyDown={this.getKey} tabIndex='0'>
                    <div className="toolbar" onMouseEnter={()=>this.setState({terminal:{drag: true}})} 
                    onMouseLeave={()=>this.setState({terminal:{drag: false}})}>
                        <div className="buttons">
                            <button className="exit">x</button>
                            <button className="minimize">─</button>
                            <button onClick={()=>this.maximize()}>◻</button>
                        </div>
                        <p className="user">
                            karol@ubuntu:{this.props.directory}
                        </p>
                    </div>
                    <div className="terminalBody">
                        {this.state.terminalArchive}
                        <div className="prompt">
                            <span className="user">karol@ubuntu</span>:
                            <span className="location">{this.props.directory}</span>$
                            <span className="command">{this.state.command}</span>
                            <span className="cursor"></span>
                        </div>
                    </div>
                </div>
            </Rnd>
        )
    }
}

export default Terminal;