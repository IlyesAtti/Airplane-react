import { useEffect, useState } from "react";
import AirPlane from "./Airplane";
import Asteroids from "./Asteroid";
import GameOver from "./GameOver";
import Timer from './Timer';

export default function Game() {
  const [isStarted, setIsStarted] = useState(false);
  const [planePosition, setPlanePosition] = useState(300);
  const [keysPressed, setKeysPressed] = useState({});
  const [bulletId, setBulletId] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [asteroidPosition, setAsteroidPosition] = useState(300);
  const [asteroidTopPosition, setAsteroidTopPosition] = useState(0);
  const [attackSpeed, setAttackSpeed] = useState(10);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState("Start");
  const [lastBulletTime, setLastBulletTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

//---------------Plane and move----------------------------

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [e.which]: true,
      }));
    };

    const handleKeyUp = (e) => {
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [e.which]: false,
      }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {    
    if(isStarted && !isGameOver) {
      const interval = setInterval(() => {
        if (keysPressed[37] && planePosition > 0) {
          setPlanePosition(prevPlanePosition => Math.max(prevPlanePosition - 10, 0));
        }
        if (keysPressed[32] && Date.now() - lastBulletTime >= 500) {  // delay for bullets, shot only 2 bullets/sec
          addBullet(planePosition);
          setLastBulletTime(Date.now());
        }
        if (keysPressed[39] && planePosition < 600) {
          setPlanePosition(prevPlanePosition => Math.min(prevPlanePosition + 10, 600));
        }
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isStarted, keysPressed, planePosition, lastBulletTime]);

//-------------------- End Plane and move----------------------------

//---------------------Bullets + Asterodis----------------------------------

  useEffect(() => {
    if (isStarted && !isGameOver) {
      const interval = setInterval(() => {
        const updatedBullets = bullets.map(bullet => {
          if (bullet.bulletTopPosition <= 0) {
            bullet.isActive = false; 
          }
          if (bullet.isActive) {
            if ((bullet.bulletPosition >= asteroidPosition - 70 && bullet.bulletPosition <= asteroidPosition + 110) && Math.abs(asteroidTopPosition - (bullet.bulletTopPosition - 100)) < 2) {
              setScore(prevScore => prevScore + 1);
              newAsteroid();
              bullet.isActive = false;
            }
            return { ...bullet, bulletTopPosition: bullet.bulletTopPosition - 1 }; 
          }
          return bullet;
        });
        setAsteroidTopPosition(prevAsteroidTopPosition => prevAsteroidTopPosition + 1);
        setBullets(updatedBullets); 
      }, attackSpeed);
      return () => clearInterval(interval);
    }
  }, [isStarted, bullets, asteroidPosition, asteroidTopPosition, attackSpeed]);

  function addBullet(planePosition) {
    setBullets(prevBullets => [
      ...prevBullets,
      { id: bulletId, bulletPosition: planePosition, isActive: true, bulletTopPosition: 380 }
    ]);
    setBulletId(prevBulletId => prevBulletId + 1);
  }

  useEffect(() => {
    if (asteroidTopPosition === 395) {
      newAsteroid();
    }
  }, [asteroidTopPosition]);

  function newAsteroid() {
    setAsteroidTopPosition(0);
    setAsteroidPosition(Math.floor(Math.random() * 560 + 1));
  }

//--------------------- End Bullets + Asteroids------------------------------

//----------------------Buttons---------------------------------------------

  const toggleGame = () => {
    setIsStarted(prev => !prev);
    setButtonText(prev => (prev === "Start" ? "Pause" : "Start"));
  };

  useEffect(() => {
    let intervalId;
    if (isStarted && !isGameOver) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
      Timer(time);
    }
    return () => clearInterval(intervalId);
  }, [isStarted, time]);

  const renderedBullets = bullets.map((bullet, index) => (
    <div key={bullet.id + index} className={bullet.isActive ? 'bullet isActive' : 'bullet'} style={{ left: `${bullet.bulletPosition + 45}px`, top: `${bullet.bulletTopPosition}px` }}></div>
  ));

  function restart() {
    window.location.reload(false);
  }
  
//--------------------- End Buttons------------------------------

//---------------------Time + Scor + Game Over-------------------

  useEffect(() => {
    if (time % 50 === 0 && attackSpeed > 2 && time > 1 && time !== lastUpdate) {
      setAttackSpeed(prevAttackSpeed => Math.max(prevAttackSpeed - 1, 2));
      setLastUpdate(time);
    }
  }, [time, attackSpeed, lastUpdate]);

 useEffect(() => {
    if (
      planePosition >= asteroidPosition - 70 &&
      planePosition <= asteroidPosition + 110 &&
      asteroidTopPosition >= 310
    ) {
      setIsGameOver(true);
    }
  }, [planePosition, asteroidPosition, asteroidTopPosition]); 
  
  if (isGameOver) {
    document.querySelector('.start-btn').style = "visibility: hidden";
  }

//--------------------- End Time + Scor + Game Over-------------------

  return( 
    <>
     <Timer timer = {time}/>
     <button className='restart' onClick={restart}>Restart</button>
      <p className='score'> Score: {score}</p>
      <button className="start-btn" onClick={toggleGame}>
        {buttonText}
      </button>
    <div className="gamezone">
    <AirPlane planePosition={planePosition} />
    <GameOver over = {isGameOver} />
    {renderedBullets}
    <Asteroids asteroidPosition={asteroidPosition} asteroidTopPosition={asteroidTopPosition} />
    </div>
    </>
  );
}