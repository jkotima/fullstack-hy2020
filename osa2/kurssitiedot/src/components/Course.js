import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p><b>
            total of {sum} exercises
        </b></p>
    ) 
}

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course} />
        {course.parts.map(part => 
            <Part key={part.id} part={part} />
        )}
        <Total course={course} />
        </div>
    )
}

export default Course