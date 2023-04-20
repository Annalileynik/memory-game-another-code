import React from "react"

const Square = (props) => {
    return (
        <button className="square"
        onClick={()=>props.openCard(props.card.id, props.card.image)}
        >
            {props.card.isOpen ? props.card.image : ''}
        </button>
    )

}
export  default Square;
