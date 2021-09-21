import React, { useState, useEffect, useRef } from 'react'

const Timer = (props) => {

    return (
        <div className="center">
            {!props.running && <button onClick={props.handleStartClick}>START THE GAME</button>}
            <button onClick={props.handleNextClick}>NEXT</button>
            {props.lapse}
            {props.gameEnd && JSON.stringify(props.timeTaken[props.timeTaken.length - 1])}
        </div>
    );
}

export default Timer