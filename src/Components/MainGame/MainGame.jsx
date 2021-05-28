import React, { useEffect } from 'react'
import s from './MainGame.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card/Card'
import GuesserTimer from './GuesserTimer/GuesserTimer'
import Timer from '../Statistic/Timer/Timer'

function MainGame(props) {

    const startGame = useSelector(state => state.app.startGame)
    const endGame = useSelector(state => state.app.endGame)
    const size = useSelector(state => state.app.size)
    const cardsInRow = useSelector(state => state.app.openCards)
    const guessedCards = useSelector(state=> state.app.countRight)

    const data = useSelector(state => state.app.data)

    useEffect(()=>endGame && props.setOpenStatistic(true), [endGame])

    function createColumns(countCards) {
        let template = '';
        for (let i = 0; i < Math.ceil(Math.sqrt(2 * countCards)); i++) {
            template += '1fr '
        }
        return template
    }

    function createRows(countCards) {
        let template = '';
        for (let i = 0; i < Math.ceil(Math.sqrt(2 * countCards)); i++) {
            template += '1fr '
        }
        return template
    }

    function createAreas(countCards) {
        let template = []
        let newRow = ''
        for (let i = 0; i < Math.ceil(Math.sqrt(2 * countCards)); i++) {
            for (let j = 0; j < Math.ceil(Math.sqrt(2 * countCards)); j++) {
                newRow += `card${i + 1}${j + 1} `
            }
            template.push(newRow)
            newRow = ''
        }
        return template.join(" ")
    }

    return (
        <div className={s.mainWrapper}>
            <div className={s.load}>
                {startGame && <GuesserTimer length={cardsInRow.length > 0} />}
            </div>
            <div className={s.statistic}>
                <span>{guessedCards}/{size}</span>
                <Timer startGame={startGame} endGame={endGame} />
            </div>
            <section className={s.wrapper} style={{ gridTemplateColumns: createColumns(size), gridTemplateRows: createRows(size), gridTemplateAreas: createAreas(size) }}>
                {data.map((item, key) => <Card key={`card${key}`} value={item.value} id={item.id} show={item.isOnBoard} size={(size - 1) / (100 - 1)} />)}
            </section>
        </div>
    )
}

export default MainGame;