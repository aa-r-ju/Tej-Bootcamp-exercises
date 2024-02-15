import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'


 const reducer  = (state = 0 , action) => {
  if (action.type === "ADD") {
   return state + 1
  }
  else if (action.type === "MINUS") {
    return state - 1
  } 
  else if (action.type === "ZERO") {
    return state = 0
  }
  return state

 }
const store = createStore(reducer)

const App = () => {


  return (
    <div>
     <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'ADD' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'MINUS' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>     
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

