import React from "react";
import Plane from '../plane.png';
import { useEffect, useState } from 'react';
import useBulets from './Bulets';
import {VerifPlane} from "./Verif";


export default function AirPlane(isStarted) {
    const moveSpeed = 10;
    const [planePosition, setPlanePosition] = useState(300);
    const [keysPressed, setKeysPressed] = useState({});
    const { addBulet, renderedBulets } = useBulets(planePosition); 

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
    useEffect (() => {
        VerifPlane(planePosition);
    }, [planePosition])
    useEffect(() => {
        if(isStarted.isStarted) {
            const interval = setInterval(() => {
                if (keysPressed[37] && planePosition > 0) {
                    setPlanePosition((prevPlanePosition) =>
                        Math.max(prevPlanePosition - moveSpeed, 0)
                    );
                }
                if (keysPressed[39] && planePosition < 600) {
                    setPlanePosition((prevPlanePosition) =>
                        Math.min(prevPlanePosition + moveSpeed, 600)
                    );
                }
                if (keysPressed[32]) {
                    addBulet(planePosition);
                }
            }, 16);
            return () => clearInterval(interval); 
        }
    }, [keysPressed, planePosition]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
        <div className="Airplane">
            <img src={Plane} className="Plane" style={{ left: planePosition + 'px' }} alt="plane" />
            {renderedBulets} {}
        </div>
        </>
    )
}
