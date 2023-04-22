import {v4 as uuidv4} from 'uuid'
import './App.css';
import {useEffect, useState} from "react";
import Board from "./components/Board";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
    const [cards, setCards] = useState(new Array(20).fill(null).map((el) =>
        ({
            id: uuidv4(),
            image: null,
            isOpen: false
        })
    ))
    const [history, setHistory] = useState([])

    const emojyBoard = ['🍇', '🐙', '🦐', '🐸', '☎️', '🎠', '💋', '🏓', '🥎', '🐞']
    const [block, setBlock] = useState(false)
    const [winner, setWinner] = useState(false)
    const [moves, setMoves] = useState([])
    const setRandomPlace = () => {
        const newCards = cards.map(el => ({...el, image: null, isOpen:false}))
        for (let i = 0; i <= emojyBoard.length - 1; i++) {
            for (let y = 1; y <= 2; y++) {
                let index;
                do {
                    index = Math.trunc(Math.random() * newCards.length)
                }
                while (newCards[index].image !== null)
                newCards[index].image = emojyBoard[i]
            }
        }
        setCards(newCards)
    }

    useEffect(() => {
        setRandomPlace()
    }, [])

    const openCard = (id, image) => {
        const isOpenCard = cards.find(el => el.id === id).isOpen
        console.log(isOpenCard)
        if (!block && !isOpenCard) {
            const newCards = cards.map(el =>
                id === el.id ? {...el, isOpen: true} : el)
            setCards(newCards)
            setHistory([...history, image])
            setBlock(true)
        }
    }
    const checkMove = () => {
        if (history[history.length - 1] !== history[history.length - 2]) {
            const emojy1 = history[history.length - 1]
            const emojy2 = history[history.length - 2]
            const newCards = cards.map(card =>
                card.image === emojy1 || card.image === emojy2 ? {...card, isOpen: false} : card)
            setCards(newCards)
        }
    }
    useEffect(() => {
        if (history.length % 2 === 0) {
            setTimeout(() => {
                checkMove()
                setBlock(false)
            }, 400)
        } else {
            setBlock(false)
        }
    }, [history])

    const checkWinner = () => {
        const win = cards.every(el => el.isOpen)
        setWinner(win)
        if (win)
        {
            setMoves([...moves, history.length / 2])
        }
    }
    useEffect(() => {
        if (history.length > 12) {
            checkWinner()
        }

    }, [history])
    const restart = () => {
        setRandomPlace()
        setHistory([])
        setBlock(false)
        setWinner(false)

    }

    return (

        <div className="App">
            <h1>Memory game</h1>
            <Board cards={cards}
                   openCard={openCard}/>

            {winner &&
                <><h3> Congratulation, you won in {history.length / 2} moves</h3>
                <button
                    onClick={restart}
                    className='btn btn-outline-danger'>Restart</button></>
            }
            {moves.length > 0 &&
                <h2> Moves: {moves.map((el, index) => (index === moves.length - 1) ? `${el}` : `${el},`)}</h2>}
        </div>
    );
}

export default App;
