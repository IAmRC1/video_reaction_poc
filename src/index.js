import React, { useState, useRef, useEffect, } from 'react'
import { render } from 'react-dom'
import './style.css'
import { videosArray } from './constants'

const App = () => {
    const [index, setIndex] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [running, setRunning] = useState(false);
    const [lapse, setLapse] = useState(0);
    const [timeTaken, setTimeTaken] = useState([]);
    
    const timerRef = useRef(null);
    const videoRef = useRef(null);

    const startGame = () => {
        videoRef.current.play();
        videoRef.current.setAttribute('autoplay', 'autoplay');
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const handleStartClick = () => {
        if(gameEnd) setGameEnd(!gameEnd);
        startGame();
        const startTime = Date.now() - lapse;
        timerRef.current = setInterval(() => {
            setLapse(Date.now() - startTime);
        }, 0);
        setRunning(true);
    };

    const handleNextClick = () => {
        if (index < videosArray.length - 1) {
            console.log(`index`, index)
            setTimeTaken([...timeTaken, lapse]);
            setIndex(index + 1);
        }
        else {
            console.log(`final video click`)
            setTimeTaken([...timeTaken, lapse]);
            setLapse(0);
            setIndex(0);
            setRunning(false);
            setGameEnd(true);
            clearInterval(timerRef.current);
            videoRef.current.removeAttribute('autoplay');
        } 
    };

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center my-3">
                {gameEnd 
                    ? <p>Finished the game, here are your stats</p> 
                    : <video
                        ref={videoRef}
                        src={videosArray[index]}
                        width="100%"
                    >
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                }
                <div className="d-flex flex-column align-items-center w-100">
                    {!running && <button type="button" className="btn w-100 btn-primary mt-3" onClick={handleStartClick}>START</button>}
                    {!gameEnd && <button type="button" className="btn w-100 btn-secondary mt-3" onClick={handleNextClick}>NEXT</button>}
                    {running && <p className="pt-3">{lapse} ms</p>}
                    {gameEnd && <p className="pt-3">Time taken : {JSON.stringify(timeTaken[timeTaken.length-1])} ms</p>}
                </div>
            </div>
        </div>
    );
}

render(<App />, document.getElementById('app'));
