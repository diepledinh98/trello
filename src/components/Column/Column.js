import React from "react";
import Task from "../Task/Task";


import './Column.scss';

function Column() {
    return (
        <div className='column'>
            <header>
                Brain Storm
            </header>
            <ul>
                <Task />
                <li>Ăn tết xong kiếm tiền</li>
                <li>Ăn tết xong kiếm tiền</li>
                <li>Ăn tết xong kiếm tiền</li>
                <li>Ăn tết xong kiếm tiền</li>

                <li>Ăn tết xong kiếm tiền</li>
            </ul>

            <footer>Add another card</footer>
        </div>
    )
}

export default Column;