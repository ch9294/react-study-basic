import React from 'react';

// 클래스의 경우: constructor => render => ref => componentDidMount

const rspCoords = {
    바위: '0', 가위: '-142px', 보: '-284px'
}

const scores = {
    바위: 1, 가위: 0, 보: -1
}

class RSP extends React.Component {
    state = {
        result: '', imgCoord: '0', score: 0
    }

    intervalId;
    refComputer;

    componentDidMount() { // 컴포넌트가 첫 렌더링 된 후(이후 상태 변화에 대한 리렌더링에서는 호출 안됨)
        // const {imgCoord} = this.state;

        this.intervalId = setInterval(() => {
            // console.log("현재 위치:", this.state.imgCoord, "intervalId:", this.intervalId);
            switch (this.state.imgCoord) {
                case rspCoords.바위:
                    this.setState({imgCoord: rspCoords.가위})
                    this.refComputer.style.backgroundPosition = `${rspCoords.가위} 0`
                    break;
                case rspCoords.가위:
                    this.setState({imgCoord: rspCoords.보})
                    this.refComputer.style.backgroundPosition = `${rspCoords.보} 0`
                    break;
                case rspCoords.보:
                    this.setState({imgCoord: rspCoords.바위})
                    this.refComputer.style.backgroundPosition = `${rspCoords.바위} 0`
                    break;
                default:
                    break;
            }
        }, 100);
    }

    componentDidUpdate(prevProps, prevState, snapshot) { // 상태변화에 의한 리렌더링에 호출됨

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전
        clearInterval(this.intervalId);
    }

    onClickBtn = (choice) => {
        clearInterval(this.intervalId);

        const computerChoice = (imgCoord) => {
            if (this.state.imgCoord === rspCoords.바위) { // 무승부
                return "바위"
            } else if (this.state.imgCoord === rspCoords.가위) { // 승리
                return "가위"
            } else if (this.state.imgCoord === rspCoords.보) { // 패배
                return "보"
            }
        }

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.state.imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState(prev => {
                console.log("비겼음")
                return {result: '비겼습니다!', score: prev.score + diff}
            })
        } else if (diff === -1) {
            this.setState(prev => {
                console.log("졌음")
                return {result: '졌습니다!', score: prev.score + diff}
            })
        } else {
            this.setState(prev => {
                console.log("이김")
                return {result: '이겼습니다!', score: prev.score + diff}
            })
        }
    }

    render() {
        const {result, score, imgCoord} = this.state;
        return (<>
            <div ref={(ref) => {
                this.refComputer = ref;
            }} id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)`}}></div>
            <div>
                <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                <button id="scissors" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
            </div>
            <div>현재 {this.state.score}점</div>
        </>)
    }
}

export default RSP