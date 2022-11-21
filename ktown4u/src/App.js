import logo from './logo.svg';
import './App.css';
import MyTabsComponent from "./solutions/MyTabsComponent";
import Solution from "./solutions/Solution";

function App() {
    return (
        // <div className="App">

        // </div>
        <>
            <MyTabsComponent>
                <div title={"Section title 1"}>Content of section 1</div>
                <div title={"Section title 2"}>Content of section 2</div>
                <div title={"Section title 3"}>Content of section 3</div>
            </MyTabsComponent>
            {/*<Solution/>*/}
        </>
    );
}

export default App;
