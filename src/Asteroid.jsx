import { useState, useEffect} from 'react';
import asteroidImg from '../asteroid.png';
import Compare , {VerifAsteroid} from './Verif';
import hit, {posAsteroid} from './hit';


export default function AsteroidAtack(isStarted) {
    const [asteroidPosition, setAsteroidPosition] = useState(300)
    const [asteroidTopPosition, setAsteroidTopPosition] = useState(0)
    function newAsteroid() {
        setAsteroidTopPosition(0)
        setAsteroidPosition(Math.floor((Math.random()  * 560) + 1));
    }
    useEffect(() => {
        if(isStarted.isStarted) {
            const interval = setInterval(() => {
                Compare();
                hit();
                setAsteroidTopPosition(asteroidTopPosition + 1)
            }, 10)
            return () => clearInterval(interval); 
        }
    },[newAsteroid, isStarted])
    if (asteroidTopPosition == 395) {
        newAsteroid();
    }
    useEffect(() => {
        VerifAsteroid(asteroidTopPosition, asteroidPosition);
        posAsteroid(asteroidTopPosition, asteroidPosition);
    },[asteroidTopPosition, asteroidPosition]);
    return (
        <>
        <img
            src={asteroidImg}
            className={"asteroid"}
            style={{ left: (asteroidPosition) + 'px', top: asteroidTopPosition + 'px' }}
        ></img>
        </>
    )
}
