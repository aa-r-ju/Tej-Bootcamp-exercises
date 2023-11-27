import React from "react"
import Header from "./Component/Header"
import Content from "./Component/Content"
import Total from "./Component/Total"


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      {/* <Content part1 = {part1}  part2 = {part2} part3 = {part3} exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} /> */}
      <Content parts = {[part1.name,part2.name,part3.name]} exercises={[part1.exercises,part2.exercises,part3.exercises]}/>
      <Total  total = {[part1.exercises,part2.exercises,part3.exercises]} />
    </div>
  )
}

export default App