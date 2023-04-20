import React from "react"
import Square from "./Square";

const Board = (props) => {
    return (
        <div className="board">
            {props.cards.map(element=>
            <Square key={element.id}
                card={element}
                    openCard={props.openCard}/>
            )}
        </div>
    )

}
export  default Board;
