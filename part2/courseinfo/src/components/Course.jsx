import React from "react"

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = (props) => {
  return (
    <>
    {props.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    </>
  )
}

const Total = ({ parts }) => {
  const initialSum = 0
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, initialSum)
  return(
    <>
    <p><b>total of {totalExercises} exercises</b></p>
    </>
  )
}

const Course = ({ courses }) => {
    return(
      <>
      {courses.map((course) => (
        <React.Fragment key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </React.Fragment>
      ))}
      </>
    )
}

export default Course