import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
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
    <h2>Statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    

    </div>
  )
}

export default App