import React from 'react';
import s from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { newGame, startGame } from '../../Redux/appReducer';

function Menu(props) {

    const dispatch = useDispatch()
    let guessed = useSelector(state => state.app.countRight)
    let [size, setSize] = React.useState(18)
    let [name, setName] = React.useState("")

    let [onFocus, setOnFocus] = React.useState(false)

    let [openLevel, setOpenLevel] = React.useState(false)

    function sizeHandler(e) {
        e.preventDefault()
        setSize(e.target.value)
    }

    function startHandler(e) {
        e.preventDefault()
        if (name !== "") {
            let flag = true
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) === name) {
                    flag = false
                    break
                }
            }
            if (flag) {
                if(size>0 && size<101){
                    props.setOpenMenu(false)
                    dispatch(startGame(size, name)) 
                }else{
                    alert('Sorry, but count of cards must be upper than 0 and lower than 101. You have ' + size)
                }
            } else {
                alert(name + " is already used, please, choose another one")
            }
        } else {
            alert('Please, input your name')
        }
    }

    function newGameHandler(e) {
        e.preventDefault()
        dispatch(newGame())
    }

    function nameHandler(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    return (
        <div className={s.wrapper}>
        <div className={`${s.burger} ${props.openMenu && s.active}`} onClick={(e) => {props.setOpenMenu(!props.openMenu)
        props.setOpenStatistic(false)}}>
                <span className={s.burger_line_1}></span>
                <span className={s.burger_line_2}></span>
                <span className={s.burger_line_3}></span>
            </div>
            <div className={s.startWrapper}>
                <button className={s.btn} onClick={(e) => startHandler(e)}>Start Game</button>
            </div>
            <div className={s.endWrapper}>
                <button className={s.btn} onClick={(e) => newGameHandler(e)}>New Game</button>
            </div>
            <div className={`${s.nameWrapper} ${(name || onFocus) && s.active}`}>
                <label htmlFor="nameInput" className={s.nameLabel}>Your name</label>
                <input id='nameInput' type="text" value={name} onChange={nameHandler} onFocus={()=>setOnFocus(true)} onBlur={()=>setOnFocus(false)}/>
            </div>
            <div className={s.level}>
                <label htmlFor="level" className={s.levelLabel}>Choose level:</label>
                <input id="level" type="range" step="1" min="1" max="100" value={size} onChange={sizeHandler} />
            </div>
            <div className={s.count_cards} onClick={()=>setOpenLevel(true)} onMouseLeave={()=>setOpenLevel(false)}>
                <div>Count of cards: </div>
                {!openLevel ? <span>{size}</span> : <input type="number" min="1" max="100" value={size} onChange={sizeHandler}/>}
            </div>
            <div className={s.guessed_cards}>
                <div>Guessed cards: {guessed} / {size}</div>
            </div>
            <div className={s.toggleTheme} onClick={() => props.toggleTheme(!props.theme)}>
                <div className={`${s.themeWrapper} ${!props.theme && s.active}`} >
                    <span></span>
                </div>
                <span>Toggle theme to {props.theme ? 'dark' : 'light'}</span>
            </div>
        </div>
    )
}

export default Menu