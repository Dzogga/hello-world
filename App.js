import React, { useState } from 'react';

function LastUpdated(props) {
    const ago = props.new - props.old;
    return (
      <div>Last update was {ago} seconds ago!</div>
    );
};

function TimeStampButton(props) {
    return (
        <button onClick={props.handler}>Updates done!</button>
    )
}

function ClockDisplay(props) {
    return (
        <div>Clock time: {props.get}</div>
    )
}

function App() {
    function findStampTime() {
        const seconds = 1000;
        const minutes = seconds * 60;
        const hours = minutes * 60;
        const days = hours * 24;
        const years = days * 365;
        let d = new Date();
        let t = d.getTime();

        let y = Math.round(t / seconds);
        console.log("findStampTime() finished, stamp time is " + y)
        return y
    };
const [timeStamp, setStamp] = useState(0);
const [clock, setClock] = useState(0);
const setStampHandler = () => setStamp(findStampTime);

useEffect(() => {
    let id = setInterval(() => {
      setClock(Math.round(new Date().getTime() / 1000));
    }, 1000);
    return () => clearInterval(id);
  });

    return (
        <div>
            <LastUpdated old={timeStamp} new={clock}/>
            <TimeStampButton handler={setStampHandler}/>
            <ClockDisplay get={clock}/>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('mountNode'),
  );
