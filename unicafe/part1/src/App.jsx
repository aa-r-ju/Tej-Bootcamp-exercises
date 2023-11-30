import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  let add = good + neutral + bad
  let averageSum = (good - bad)/add
  let positiveSum = good/add * 100

  if(good === 0 && neutral === 0 && bad ===0 ){
    return(
      <p> No feedback given </p>
    )
  }

  return(
    <>
      <h2>Statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {add}</p>
    <p>average {averageSum}</p>
    <p>positive {positiveSum}%</p>
    </>
  )
}


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
    <button onClick={handleGoodIncrease}>good</button>
    <button onClick = {handleNeutralIncrease}>neutral</button>
    <button onClick = {handleBadIncrease}>bad</button>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    

    </div>
  )
}

export default App