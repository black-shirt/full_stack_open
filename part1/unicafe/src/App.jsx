import React, { useState } from 'react';

const StatisticsLine = (props) => {
  return (
    <>
    {props.text} {props.value}
    </>
  );
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = total === 0 ? 0 : (props.good - props.bad) / total;
  const positivePercentage = total === 0 ? 0 : (props.good / total) * 100;

  if(total != 0) {
    return (
      <>
      <h1>statistics</h1>
      <table>
        <tr>
          <td><StatisticsLine text="good" /></td><td><StatisticsLine value={props.good}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="neutral" /></td><td><StatisticsLine value={props.neutral}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="bad" /></td><td><StatisticsLine value={props.bad}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="all" /></td><td><StatisticsLine value={total}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="average" /></td><td><StatisticsLine value={average.toFixed(1)}/></td>
        </tr>
        <tr>
          <td><StatisticsLine text="positive" /></td><td><StatisticsLine value={positivePercentage.toFixed(1)}/> %</td>
        </tr>
      </table>
      </>
    );
  }

  return(
    <>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </>
  );
  
};

const App = () => {
  const [good, setTotalGood] = useState(0);
  const [neutral, setTotalNeutral] = useState(0);
  const [bad, setTotalBad] = useState(0);
  
  const incGood = () => {
    setTotalGood(good + 1);
  } 
  
  const incNeutral = () => {
    setTotalNeutral(neutral + 1);
  }
  
  const incBad = () => {
    setTotalBad(bad + 1);
  }

  return (
    <>
    <h1>give feedback</h1>
    <button onClick={() => incGood()}>good</button>
    <button onClick={() => incNeutral()}>neutral</button>
    <button onClick={() => incBad()}>bad</button>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
