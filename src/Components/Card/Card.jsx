import React from 'react';
import s from './Card.module.css';
import {useDispatch} from 'react-redux'
import { checkCards } from '../../Redux/appReducer';

function Card(props) {

    const dispatch = useDispatch()

    let [isOpen, setIsOpen] = React.useState(false)

    function handlerClick(e){
        e.preventDefault()
        setIsOpen(true)
        dispatch(checkCards(props.id, setIsOpen))
    }

    return (
        <section className={s.wrapper} style={{height: 110-props.size*55 + 'px'}}>
            <div className={`${s.card} ${isOpen && s.flipped} ${props.show ? s.show : s.hide}`} style={{pointerEvents: isOpen ? "none" : "all"}} onClick={(e)=>handlerClick(e)}>
                <div className={`${s.card_content} ${s.front}`}>
                    <span>GuessGame</span></div>
                <div className={`${s.card_content} ${s.back}`}>{props.value}</div>
            </div>
        </section>

    )
}

export default Card