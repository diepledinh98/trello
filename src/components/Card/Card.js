import React from "react";


import './Card.scss';

function Card(props) {
    const { card } = props
    console.log(card)
    return (
        <li>
            {card.cover && <img src={card.cover} alt='dieple' />}

            {card.title}
        </li>
    )
}

export default Card;