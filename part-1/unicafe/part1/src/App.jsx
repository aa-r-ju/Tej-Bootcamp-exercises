import { useState } from 'react'


const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>{text}</button>

    )

}



const Statistics = ({good,neutral,bad}) => {
  let add = good + neutral + bad
  let average = (good - bad)/add
  let positive = (good/add)*100

  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <p> No feedback given </p>
    )
  }

  return(
    <>
      <h2>Statistics</h2>
      <table>
      <tbody>
      <StatisticsLine text="good" value ={good} />
      <StatisticsLine text="neutral" value ={neutral} />
      <StatisticsLine text="bad" value ={bad} />
      <StatisticsLine text="all" value ={add} />
      <StatisticsLine text="average" value ={average} />
      <StatisticsLine text="positive" value ={positive} />
      </tbody>
      </table>
    </>
  )
}



const StatisticsLine = ({text, value }) => {
      
  return (
    <>
  
    <tr>
     <td> {text}</td>
      <td> {value}</td>
      </tr>
  
    </>
  );
};





const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodIncrease = () =>{
    setGood(good + 1)

  }

  const handleNeutralIncrease = () => {
    setNeutral(neutral + 1)
  }

  const handleBadIncrease = () => {
    setBad(bad + 1)
  }
   

     
  return (    
    <div>
    <h1>give feedback</h1>
   <Button handleClick={handleGoodIncrease} text="good"/>
   <Button handleClick={handleNeutralIncrease} text="neutral"/>
   <Button handleClick={handleBadIncrease} text="bad"/>
    <Statistics  good={good} neutral={neutral} bad={bad}/>
   
    </div>
  )
}



 export default App