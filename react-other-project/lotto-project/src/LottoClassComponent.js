import React from "react";
import Ball from "./Ball";
import {clear} from "@testing-library/user-event/dist/clear";

function getWinNumbers() {
    console.log("getWinNumbers");

    const candidate = Array(45).fill(0).map((v, i) => v + i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    // console.log(shuffle);
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumbers, bonusNumber];
}

class LottoClassComponent extends React.Component {

    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null,
        redo: false
    }

    index = 0;
    id = null;

    lottoInterval = () => {
        this.id = setInterval(() => {
            this.setState({
                winBalls: [...this.state.winBalls].concat(this.state.winNumbers[this.index++])
            })
        }, 700);
    };

    onClickRedo = () => {
        this.setState({
            winBalls: [],
            bonus: null,
            redo: false
        });
    }

    componentDidMount() {
        this.lottoInterval();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.winBalls.length === 5) {
            clearInterval(this.id);
            setInterval(() => {
                this.setState({
                    bonus: this.state.winNumbers[this.index],
                    redo: true,
                });
            }, 700);
        }
    }

    render() {
        const {winBalls, bonus, redo} = this.state;

        return (<>
            <div>당첨숫자</div>
            <div id="result" style={{display: 'flex'}}>
                {
                    winBalls.map((ball) => <Ball key={ball} number={ball}>{ball}</Ball>)
                }
            </div>
            <div>보너스!</div>
            {this.state.bonus && <Ball number={this.state.bonus}>{this.state.bonus}</Ball>}
            {this.state.redo && <button onClick={redo ? this.onClickRedo : () => {
            }}>One more!!</button>}
        </>);
    }
}

export default LottoClassComponent;