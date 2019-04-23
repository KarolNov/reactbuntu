import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

import { commandsOutput } from '../../variables';
import './Terminal.scss';

class Terminal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            command: "help",
            index: 0,
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
        if (key === 'Backspace') {
            command = command.slice(0, command.length - 1);
        } else if (key === 'Enter') {
            command = '';
            this.fireCommand()
        } else if(key === "ArrowUp"){
            this.setState({
                index: this.state.index>0 ? this.state.index-1 : 0
            })
            let archive = this.state.commandsArchive[this.state.index];
            command =  typeof archive === "object" ? archive.command : '';
        } else if(key === "ArrowDown"){
            this.setState({
                index: this.state.index<this.state.commandsArchive.length ? this.state.index+1 : 0
            })
            let archive = this.state.commandsArchive[this.state.index];
            command =  typeof archive === "object" ? archive.command : '';
        } else if (key.length === 1) {
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

        let archive =
            <div style={{ width: '100%' }}>
                {
                    commandsArchive.map(el => {
                        let out = el.output.split("\n").map(line => <p>{line}<br /></p>);
                        return (
                            <>
                                <div className={"prompt"}>
                                    <span className="user">karol@ubuntu</span>:<span className="location">{this.props.directory}</span>$
                <span className="command">{el.command}</span>
                                </div>
                                <div>
                                    {out}
                                </div>
                            </>
                        )
                    })
                }
            </div>

        this.setState({
            command: "",
            commandsArchive: commandsArchive,
            terminalArchive: archive,
            index: commandsArchive.length
        });
    }

    maximize() {
        this.setState({
            height: "100%",
            width: "100%",
            maximized: !this.state.maximized
        })
    }

    render() {
        return (
            <Rnd bounds="window" default={{
                x: this.props.position.x,
                y: this.props.position.y,
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
            >
                <div className="terminal" onKeyDown={this.getKey} tabIndex='0'>
                    <div className="toolbar" onMouseEnter={() => this.setState({ terminal: { drag: true } })}
                        onMouseLeave={() => this.setState({ terminal: { drag: false } })}>
                        <div className="buttons">
                            <button onClick={() => this.props.toggle("terminal", this.props.id)} className="exit">x</button>
                            <button className="minimize">─</button>
                            <button onClick={() => this.maximize()}>◻</button>
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