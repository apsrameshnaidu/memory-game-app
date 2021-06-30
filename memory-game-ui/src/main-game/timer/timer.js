import React, { useState, useEffect } from 'react';
import EasyTimer from "easytimer";

function Timer(props) {

    const [timer] = useState(new EasyTimer());
    const [timeValues, setTimeValues] = useState("00:00:00");

    useEffect(() => {
        timer.start();
        timer.addEventListener('secondsUpdated', updateTimer)
    }, []);

    const updateTimer = () => {
        const timeValue = timer.getTimeValues().toString();
        setTimeValues(timeValue);
    }

    const sendTime = () => {
        timer.stop();
        props.receiveTime(timeValues);
    }

    return (
        <>
            <div id="basicUsage">{timeValues}</div>
            {props.gameOver && sendTime()}
        </>
    );
}

export default Timer;
