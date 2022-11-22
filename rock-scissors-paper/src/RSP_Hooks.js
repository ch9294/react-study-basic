import React, {useEffect, useRef, useState} from 'react';

const rspCoords = {
    바위: '0', 가위: '-142px', 보: '-284px'
}

const scores = {
    바위: 1, 가위: 0, 보: -1
}

const RspHooks = props => {
    const [result, setResult] = useState("");
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const background = useRef();
    const intervalId = useRef(0);

    const onClickBtn = (choice) => (event) => {
        clearInterval(intervalId.current);

        const computerChoice = (imgCoord) => {
            if (imgCoord === rspCoords.바위) { // 무승부
                return "바위"
            } else if (imgCoord === rspCoords.가위) { // 승리
                return "가위"
            } else if (imgCoord === rspCoords.보) { // 패배
                return "보"
            }
        }

        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        setScore(prevState => prevState + diff);
        if (diff === 0) {
            setResult("비겼습니다");
        } else if (diff === -1) {
            setResult("졌습니다.");
        } else {
            setResult("이겼습니다.");
        }

        setTimeout(intervalFn,2000);
    };

    const intervalFn = () => {
        intervalId.current = setInterval(() => {
            setImgCoord((imgCoord) => {
                    switch (imgCoord) {
                        case rspCoords.바위:
                            background.current.style.backgroundPosition = `${rspCoords.가위} 0`;
                            return rspCoords.가위
                        case rspCoords.가위:
                            background.current.style.backgroundPosition = `${rspCoords.보} 0`;
                            return rspCoords.보
                        case rspCoords.보:
                            background.current.style.backgroundPosition = `${rspCoords.바위} 0`;
                            return rspCoords.바위
                        default:
                            break;
                    }
                }
            )

        }, 1000);

        return () => {
            console.log("clear")
            clearInterval(intervalId.current);
        }
    }
    useEffect(intervalFn, []);

    return (<>
        <div ref={background}
             id={"computer"}
             style={{backgroundImage: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)`}}></div>
        <div>
            <button id={"rock"} className={"btn"} onClick={onClickBtn("바위")}>바위</button>
            <button id={"scissors"} className={"btn"} onClick={onClickBtn("가위")}>가위</button>
            <button id={"paper"} className={"btn"} onClick={onClickBtn("보")}>보</button>
        </div>
        <div>현재 {score}점</div>
    </>);
};

export default RspHooks;
