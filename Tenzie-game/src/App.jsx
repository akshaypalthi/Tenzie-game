import { useState, useEffect } from 'react'
import Die from './Components/Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [die, setDie] = useState(allnewdies())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [bestscore, setBestscore] = useState(
    localStorage.getItem('bestcore') ? parseInt(localStorage.getItem('bestscore')) : 0
  )

  useEffect(() => {

    const allheld = die.every(data => data.isHeld);
    const ref = die[0].value;
    const same = die.every(data => data.value === ref);
    if (allheld && same) {
      setTenzies(true);
      if (bestscore === 0 || count < bestscore) {
        setBestscore(count);
        localStorage.setItem('bestscore', JSON.stringify(count));
      }
    }
  }, [die])

  function allnewdies() {
    const Array = []
    for (let i = 0; i < 10; i++) {
      Array.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return Array;
  }

  function holdDie(id) {
    setDie(olddie => olddie.map(data => data.id === id ? { ...data, isHeld: !data.isHeld } : data))
  }

  const KOTHA = die.map(data => <Die
    value={data.value}
    key={data.id}
    isHeld={data.isHeld}
    holdDie={() => holdDie(data.id)} />)


  function rolldie() {

    if (!tenzies) {
      setCount(count => count + 1)
      setDie(olddies => olddies.map(data => {
        return data.isHeld ? data : {
          value: Math.floor(Math.random() * 6) + 1,
          isHeld: false,
          id: nanoid()
        }
      }))
    } else {
      setCount(0);
      setTenzies(false);
      setDie(allnewdies());
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title' >Tenzies</h1>
      <p className='info' >Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p className='info'>your die-count [{count}]</p>
      <div className='dice-container'>
        {KOTHA}
      </div>
      <button className='button' onClick={rolldie}>{tenzies ? "New Game" : "Roll"}</button>
      <p className='info' >Best Score: {bestscore}</p>
    </main>
  )
}

export default App
