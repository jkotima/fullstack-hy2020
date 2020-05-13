import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnecdoteOfTheDay = ({anecdote, points}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdote}<br />
      has {points} votes<br />
    </>
  )
}

const AnecdoteWithMostVotes = ({anecdote, points}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {anecdote}<br />
      has {points} votes<br />
    </>
  )
}

const Button = (props) => { 
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  
  const handleNextAnecdote = () => {
    let next = selected
    while (next === selected) {
      next = Math.floor(Math.random() * props.anecdotes.length)
    }
    setSelected(next)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] > mostVotes) {
      setMostVotes(copy[selected])
      setMostVotedAnecdote(selected)
    }
  }

  return (
    <div>
      <AnecdoteOfTheDay 
        anecdote={props.anecdotes[selected]} 
        points={points[selected]}
      />
      <Button handleClick={handleVote} text='Vote' />
      <Button handleClick={handleNextAnecdote} text='Next anecdote' />

      <AnecdoteWithMostVotes 
        anecdote={props.anecdotes[mostVotedAnecdote]} 
        points={points[mostVotedAnecdote]}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)