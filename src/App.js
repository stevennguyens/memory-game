import {useEffect, useState} from 'react'
import Header from "./components/Header";
import CardCount from "./components/CardCount"
import Card from "./components/Card";
import uniqid from "uniqid";
import Button from './components/Button';

function App() {
  const maxCards = 40;
  const [repeat, setRepeat] = useState(true);
  const [input, setInput] = useState(2)
  const [cardCount, setCardCount] = useState(2);
  const [cardArr, setCardArr] = useState([1, 2]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [scoreArr, setScoreArr] = useState([]);

  const countChange = (e) => {
    let count = e.target.value;
    setInput(e.target.value)
    if (isNumeric(count) && count <= maxCards && count > 1) {
      setCardCount(parseInt(count))
      resetScore()
    } else {
      setCardCount(0)
    }
  }

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  }

  const onClick = (e) => {
    let id = e.target.id
    // if user loses
    if (scoreArr.includes(id)) {
      updateScores()
      setScoreArr([])
      if (!repeat) {
        setCardCount(2)
      }
    } else {
      setScoreArr(scoreArr.concat([id]))
      setScore((score) => score + 1);
    }
    shuffle()
  }

  const shuffle = () => {
    let temp;
    let rand;
    let arr = structuredClone(cardArr)
    for (let i = 0; i < arr.length; i++) {
      rand = Math.floor(Math.random() * arr.length);
      temp = arr[rand]
      arr[rand] = arr[i] 
      arr[i] = temp
    }
    setCardArr(arr)
  }

  const randomizeArr = (count) => {
    let rand;
    let arr = []
    for (let i = 0; i < count; i++) {
      rand = Math.random() * (905) + 1 
      while (arr.includes(parseInt(rand))) {
        rand = Math.random() * (905) + 1 
      }
      arr.push(parseInt(rand))
    }
    setCardArr(arr)
  }

  const resetScore = () => {
    setScore(0);
    setBestScore(0)
  }
  const updateScores = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
    setScore(0)
  }

  // whenever card count changes, reset score array
  useEffect(() => {
    setScoreArr([])
    randomizeArr(cardCount)
  }, [cardCount])

  useEffect(() => {
    if (scoreArr.length && scoreArr.length === cardCount) {
      // user has won memory game for current cards
      // reshuffle
      setScoreArr([])
      if (!repeat) {
        setCardCount(cardCount + 1)
      }
      randomizeArr(cardCount)
    } else if (!scoreArr.length) {
      randomizeArr(cardCount)
    }
  }, [scoreArr, cardCount])
  
  const onButtonClick = () => {
    setRepeat(!repeat); 
    resetScore();
    randomizeArr(cardCount)
  }

  useEffect(() => {
    if (!repeat) {
      setCardCount(2)
    } else {
      if (!cardCount) {
        setCardCount(2)
      }
    }
  }, [repeat])
  
  const scoreDiv = document.querySelector('.score-container');
  if (scoreDiv && scoreDiv.offsetTop) {
    if (window.scrollY > scoreDiv.offsetTop) {
      scoreDiv.classList.add('sticky')
    }
  }

  // const handleScroll = (e) => {
  //   console.log('in scroll')
  //   if (window.scrollY > e.currentTarget.scrollTop) {
  //     console.log('true')
  //     setSticky(true)
  //   } else {
  //     console.log('false')
  //     setSticky(false)
  //   }
  // }

  return (
    <div className="App">
      <Header/>
      <div className='btn-container'>
        <Button name="repeat" onClick={onButtonClick} active={repeat} />
        <Button name="level up" onClick={onButtonClick} active={!repeat}/>
      </div>
      <CardCount cardCount={cardCount} input={input} countChange={countChange}/>
      <div className='score-container'>
        <p className='score'>score: <span>{score}</span></p>
        <p className='best-score'>best score: <span>{bestScore}</span></p>
      </div>
      <div className="card-container">
        {cardCount ? cardArr.map((card) => {
          return (
            <Card key={uniqid()} id={card} onClick={onClick} maxCards={maxCards} className="card"/>
          )
        }) : 
          <h3 className='input-error'>enter number from 2 to {maxCards}!</h3>
      }
      </div>
    </div>
  );
}

export default App;
