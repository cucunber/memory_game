import React, { useEffect } from 'react';
import s from './Statistic.module.css';
import Timer from './Timer/Timer';
import { useSelector } from 'react-redux'
import LeaderBoard from './LeaderBoard/LeaderBoard';

function Statistic(props) {

    let [countLeaders, setCountLeaders] = React.useState(0)
    let [currentPage, setCurrentPage] = React.useState(0)
    let [show, setShow] = React.useState('')

    const startGame = useSelector(state => state.app.startGame)
    const endGame = useSelector(state => state.app.endGame)

    function paginHandler(e, numb) {
        e.preventDefault()
        setCurrentPage(numb - 1)
    }

    function showHandler(e) {
        e.preventDefault()
        setShow(e.target.value)
    }

    function createPagin(size) {
        let array = []
        for (let i = 0; i < size / 10; i++) {
            array.push(i + 1)
        }
        return array.map((item, key) => <button className={`${s.pagin_btn} ${key === currentPage && s.active}`} key={`pagin${key}`} onClick={(e) => paginHandler(e, item)}>{item}</button>)
    }

    return (
        <div className={s.wrapper}>
            <div className={`${s.cup_burger} ${props.openStatistic && s.active}`} onClick={()=>{props.setOpenStatistic(!props.openStatistic)
            props.setOpenMenu(false)
            }}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trophy" class="svg-inline--fa fa-trophy fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path></svg>
            </div>
            <div className={s.timer}>
                <Timer startGame={startGame} endGame={endGame} />
            </div>
            <div className={s.filter}>
                <label htmlFor="filter">Filter by count of cards: </label>
                <input id="filter" type="number" min="1" max="100" value={show} onChange={showHandler} />
            </div>
            <div className={s.leaderBoard}>
                <h1>Leader Board</h1>
                <LeaderBoard setCountLeaders={setCountLeaders} start={currentPage} show={show} />
            </div>
            <div className={s.pagin}>
                {createPagin(countLeaders)}
            </div>
        </div>
    )
}

export default Statistic