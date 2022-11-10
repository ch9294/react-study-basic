import React from 'react';

// 클래스의 경우: constructor => render => ref => componentDidMount

class RSP extends React.Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0
    }

    componentDidMount() { // 컴포넌트가 첫 렌더링 된 후(이후 상태 변화에 대한 리렌더링에서는 호출안됨)

    }

    componentDidUpdate(prevProps, prevState, snapshot) { // 상태변화에 의한 리렌더링에 호출됨

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전

    }

    render() {
        const {result, score, imgCoord} = this.state;

        const onClickBtn = (params) => {

        }
        return (<>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)`}}></div>
            <div>
                <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                <button id="scissors" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
            </div>
        </>)
    }
}

export default RSP