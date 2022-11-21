import React, {useState} from 'react';

const MyTabsComponent = ({children}) => {
    console.log(Array.from(children))
    console.log(children)
    console.log([1,2,3])
    const initState = new Array(children.length).fill(false).map((value,index) => index === 0);
    const [clicks, setClicks] = useState(initState);
    const titles = Array.from(children);

    const onClickHandler = (event, idx) => {
        setClicks(prevState => {
            return prevState.map((state, idx2, array) => {
                return idx === idx2;
            })
        })
    };

    return (
        <div className={"tabs"}>
            {
                clicks.map((click, idx) => {
                    return <button key={`tab${idx}`} className={click ? "btn-active" : "btn"}
                                   onClick={(event) => onClickHandler(event, idx)}>Section title {idx + 1}</button>
                })
            }
            <div className={"view"}>
                {
                    clicks.map((click, idx) => {
                        return click ? titles[idx] : null;
                    })
                }
            </div>
        </div>
    );
};


export default MyTabsComponent;