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
            commandsArchive: []
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
            let output = commandsArchive[i].output;
            archive.push(<div className={"prompt"}>{prompt}</div>);
            archive.push(<div>{output}</div>);
        }

        let terminalArchive = [];
        terminalArchive.push(<div style={{ width: '100%' }}>{archive}</div>);
        this.setState({
            command: "",
            commandsArchive: commandsArchive,
            terminalArchive: terminalArchive
        });
    }

    render() {
        return (
            <Rnd bounds="window" default={{
                x: 100,
                y: 200,
                width: 500,
                height: 300
            }} minWidth={250} minHeight={200}>
                <div className="terminal" draggable onKeyDown={this.getKey} tabIndex='0'>
                    <div className="toolbar">
                        <div className="buttons">
                            <button className="exit">x</button>
                            <button className="minimize">─</button>
                            <button>◻</button>
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