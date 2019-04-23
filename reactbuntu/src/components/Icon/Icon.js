import React, { Component } from 'react';

const Icon = (props) => {
    return (
        <div className={`icon icon-${props.name}`} onDoubleClick={()=>props.onDoubleClick(props.name)}>
            <img src={`./assets/${props.name}.svg`} width={props.size} height={props.size} alt={props.name} />
        </div>
    )
}

export default Icon;