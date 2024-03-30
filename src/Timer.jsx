import React, { useState, useEffect } from "react";

export default function Timer({ starts }) {
    const [time, setTime] = useState(0);
    useEffect(() => {
        let interval;
        if (starts) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [starts]);

    return <div className='timer'>Time: {time} </div>;
}
