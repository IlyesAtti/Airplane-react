import './App.css'
import AirPlane from './AirPlane'
import Timer from './Timer';
import { useEffect, useState } from 'react';
import AsteroidAtack from './Asteroid';
import Compare from './Verif';

export default function App() {
  const [start, setStart] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  function startStopGame() {
    setStart(prevStart => !prevStart);
    setButtonText(prevText => prevText === 'Start' ? 'Pause' : 'Start');
  }
  function restart() {
    window.location.reload(false);
  }
  useEffect(() => {
    if(start) {
      const interval = setInterval(() => {
        if (Compare()) {
          setStart(prevStart => !prevStart);
        }
      }, 10)
      return () => clearInterval(interval); 
    }
  },[start])
  return (
    <>
      <Timer starts={start}/>
      <button className='start-btn' onClick = { startStopGame }>{buttonText}</button>
      <button className='restart' onClick={restart}>Restart</button>
      <div className="gamezone">
        <AirPlane isStarted = {start}/>
        <AsteroidAtack isStarted = {start}/>
        <h2 className='gameOver'> GAME OVER!</h2>
      </div>
    </>
  );
}