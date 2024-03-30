import React from "react";
import { useState, useEffect } from 'react';
import hit, {buletInfo} from "./hit";

export default function useBulets() {
    const [buletId, setBuletId] = useState(0);
    const [bulets, setBulets] = useState([]);
 
    function addBulet(planePosition) {
        setBulets(prevBulets => [
            ...prevBulets,
            { id: buletId, buletPosition: planePosition, isActive: true, buletTopPosition: 380 }
        ]);
        setBuletId(prevBuletId => prevBuletId + 1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedBulets = bulets.map(bulet => {
                if (bulet.buletTopPosition <= 0) {
                    bulet.isActive = false;
                }
                if (bulet.isActive) {
                    return { ...bulet, buletTopPosition: bulet.buletTopPosition - 1 }; 
                } else {
                    return bulet;
                }
            });
            setBulets(updatedBulets); 
        }, 1);
        return () => clearInterval(interval);
    }, [bulets]);
    const renderedBulets = bulets.map((bulet, index) => (
        <div key={bulet.id + index} className={bulet.isActive ? 'bulet isActive' : 'bulet'} style={{ left: (bulet.buletPosition + 45) + 'px', top: bulet.buletTopPosition + 'px' }}></div>
    ));
    useEffect(() => {
       buletInfo(bulets);
    },[bulets]);
    
    useEffect(() => {
        buletInfo(renderedBulets);
    },[renderedBulets]);
    return { bulets ,addBulet, renderedBulets };
}