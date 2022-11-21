import React, {Fragment, useRef, useState} from 'react';
import {clear} from "@testing-library/user-event/dist/clear";

const Solution = props => {
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [time, setTime] = useState(0);
    const [textMin, setTextMin] = useState('00');
    const [textSec, setTextSec] = useState('00');

    const isStart = useRef(false);
    const isPause = useRef(false);
    const intervalId = useRef(0);
    const onChangeMin = (event) => {
        setMinute(event.target.value);
    };

    const onChangeSec = (event) => {
        setSecond(event.target.value);
    };

    const onClickStart = (event) => {
        event.preventDefault();
        if(isStart.current) return;
        isStart.current = true;
        const time2 = parseInt(minute * 60) + parseInt(second);
        const min = String(Math.floor(time2 / 60));
        const sec = String(time2 % 60);

        setTime(time2);
        setTextMin(min.length === 1 ? '0' + min : min);
        setTextSec(sec.length === 1 ? '0' + sec : sec);

        intervalId.current = setInterval(() => {
            if (!isPause.current) {
                setTime(prevState => {
                    if (prevState === 0) {
                        clearInterval(intervalId.current)
                        return;
                    }
                    const current = --prevState;
                    const curMin = String(Math.floor(current / 60));
                    const curSec = String(current % 60);
                    setTextMin(curMin.length === 1 ? '0' + curMin : curMin);
                    setTextSec(curSec.length === 1 ? '0' + curSec : curSec);
                    return current;
                });
            }
        }, 1000);
    }

    const onClickPauseOrResume = (event) => {
        event.preventDefault();
        isPause.current = !isPause.current;
    }

    const onClickReset = (event) => {
        clearInterval(intervalId.current);
        setTime(0);
        setMinute(0);
        setSecond(0);
        setTextMin('00');
        setTextSec('00');
        isStart.current = false;
    }

    return (
        <Fragment>
            <label>
                <input type="number" value={minute} onChange={onChangeMin} min={0}/>
                Minutes
            </label>
            <label>
                <input type="number" value={second} onChange={onChangeSec} min={0}/>
                Seconds
            </label>

            <button onClick={onClickStart}>START</button>
            <button onClick={onClickPauseOrResume}>PAUSE / RESUME</button>
            <button onClick={onClickReset}>RESET</button>

            <h1 data-testid="running-clock">{textMin}:{textSec}</h1>
        </Fragment>
    );
};


export default Solution;