import React from 'react';

export default function Die(props){
    const styling = {
     backgroundColor:props.isHeld? 'greenyellow': 'white'
    }
    return (
        <div className='die-face' style={styling} onClick={props.holdDie} >
            <h2>{props.value}</h2>
        </div>
    )
}