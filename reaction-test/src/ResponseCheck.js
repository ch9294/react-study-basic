import React, {useRef, useState} from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    // useRef로 대체 가능함
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        switch (state) {
            case "waiting":
                setState('ready');
                setMessage('초록색이 되면 클릭하세요');

                timeout.current = setTimeout(() => {
                    setState('now');
                    setMessage('지금 클릭');
                    startTime.current = new Date();
                }, Math.floor((Math.random() * 1000) + 2000));
                break;
            case "ready":
                clearTimeout(timeout.current);
                setState("waiting")
                setMessage("너무 성급하시네요! 초록색이 되고 난 후에 클릭하세요.")
                break;
            case "now":
                endTime.current = new Date();
                setState('waiting');
                setMessage('클릭해서 시작하세요.');
                setResult(prevState => [...prevState, endTime.current - startTime.current])
                break;
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        const responseTime = result.reduce((a, c) => a + c) / result.length;
        return result.length !== 0 && <>
            <div>평균 시간: {responseTime}ms</div>
            <button onClick={onReset}>초기화</button>
        </>
    };

    return <>
        <div id="screen" className={state} onClick={onClickScreen}>
            {message}
        </div>
        {renderAverage()}
    </>
};

export default ResponseCheck;

// class ResponseCheck extends React.Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요.',
//         result: [],
//     };
//
//     timeout;
//     startTime;
//     endTime;
//
//     onClickScreen = () => {
//         const {state, message, result} = this.state;
//
//         switch (state) {
//             case "waiting":
//                 this.setState({
//                     state: 'ready',
//                     message: '초록색이 되면 클릭하세요',
//                 });
//
//                 this.timeout = setTimeout(() => {
//                     this.setState({
//                         state: 'now',
//                         message: '지금 클릭'
//                     })
//                     this.startTime = new Date();
//                 }, Math.floor((Math.random() * 1000) + 2000));
//                 break;
//             case "ready":
//                 clearTimeout(this.timeout);
//                 this.setState({
//                     state: "waiting",
//                     message: "너무 성급하시네요! 초록색이 되고 난 후에 클릭하세요."
//                 })
//                 break;
//             case "now":
//                 this.endTime = new Date();
//                 this.setState((prevState) => {
//                     return {
//                         state: "waiting",
//                         message: "클릭해서 시작하세요.",
//                         result: [...prevState.result, this.endTime - this.startTime]
//                     }
//                 })
//                 break;
//         }
//     }
//
//     onReset = () => {
//         this.setState({
//             result: []
//         });
//     }
//
//     renderAverage = () => {
//         const {result} = this.state;
//         const responseTime = result.length !== 0 ? result.reduce((a, c) => a + c) / result.length : null;
//         // result.length !== 0 && console.log(`평균 응답 시간: ${responseTime}ms`)
//         return result.length !== 0 && (<>
//             <div>평균 시간: {responseTime}ms</div>
//             <button onClick={this.onReset}>초기화</button>
//         </>)
//     }
//
//     render() {
//         return <>
//             <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
//                 {this.state.message}
//             </div>
//             {this.renderAverage()}
//         </>
//     }
// }
//
// export default ResponseCheck;