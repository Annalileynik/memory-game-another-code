import { v4 as uuidv4 } from 'uuid'
import './App.css';
import {useEffect, useState} from "react";
import Board from "./components/Board";


function App() {
  const [cards, setCards]=useState(new Array(12).fill(null).map((el)=>
      ({id:uuidv4(),
          image:null,
          isOpen:false
      })
  ))
    const [history, setHistory]=useState([])

const emojyBoard = ['🍇', '🐙', '🦐', '🐸', '☎️', '🎠']

    const setRandomPlace = () => {
      const newCards = cards.map(el=> ({...el, image:null}))
        for (let i=0; i<=emojyBoard.length-1; i++){
            for(let y=1; y<=2; y++){
               let index;
                do{ index = Math.trunc(Math.random()*newCards.length)}
                while(newCards[index].image!== null)
                newCards[index].image =emojyBoard[i]
            }
        }
        setCards(newCards)
    }

    useEffect(()=>
    {
         setRandomPlace()
    },[])

    const openCard = (id, image) => {
const newCards = cards.map(el=>
id===el.id ? {...el, isOpen:true}:el)
setCards(newCards)
        setHistory([...history, image])
    }

    const checkMove = () => {
if (history[history.length-1] !== history[history.length-2]) {
   const emojy1 = history[history.length-1]
   const emojy2 = history[history.length-2]
    const newCards = cards.map(card=>
      card.image === emojy1 || card.image === emojy2 ? {...card, isOpen:false} : card)
       setCards(newCards)
    }
}

useEffect(()=>{
    setTimeout(()=>{ if (history.length % 2 ===0){
        checkMove()
    }}, 400)

},[history])

  return (
    <div className="App">
<h1>Memory game</h1>
        <Board cards={cards}
               openCard={openCard}/>
    </div>
  );
}

export default App;
