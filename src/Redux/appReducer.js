const SET_ON_BOARD = 'SET_ON_BOARD'
const START_GAME = 'START_GAME'
const ADD_OPEN_CARD = 'ADD_OPEN_CARD'
const CHECK_IS_SAME = 'CHECK_IS_SAME'
const IS_ALL_GUESSED = 'IS_ALL_GUESSED'
const TIMEOUT = 'TIMEOUT' 
const NEW_GAME = 'NEW_GAME'
const SET_TIMER_TO_GUESS = 'START_TIMER_TO_GUESS'
const SET_TIMER = 'SET_TIMER'

//начальное состояние
let initialState = {
    data: [],
    size: 0,
    countRight: 0,
    openCards: [],
    timer: 0,
    name: null,
    endGame: false,
    startGame: false,
}

//обработчик экшенов
const appReducer = (state = initialState, action) => {
    //выбор действия
    switch (action.type) {
        //запуск игры
        case START_GAME: {
            let newGame = [];
            //создаем массив на size(см action.payload в startGame) карточек
            for (let i = 0; i < action.payload.size; i++) {
                let newItem = { id: i + 1, value: i + 1, isOnBoard: true }
                newGame.push(newItem, newItem)
            }

            //используя одну из вариаций алгоритма Фишера-Йетса, мешаем наш массив
            let temp, j;
            for (let i = newGame.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1))
                temp = newGame[j]
                newGame[j] = newGame[i]
                newGame[i] = temp
                //можно использовать [newGame[i],newGame[j]]=[newGame[j],newGame[i]], но скорость присваивания намного ниже, что замедлит алгоритм
            }
            return {
                ...state, data: newGame, size: action.payload.size, endGame: false, startGame: true, timer: 0, name: `${action.payload.name}`
            }
        }
        case SET_ON_BOARD: {
            return {
                ...state, data: state.data.map(item => {
                    if (item.id === action.payload.id) {
                        item.isOnBoard = action.payload.status
                    }
                    return item
                })
            }
        }
        case ADD_OPEN_CARD: {
            if (state.openCards.length < 2) {
                return {
                    ...state, openCards: [...state.openCards, action.payload]
                }
            }
            else return state
        }
        case CHECK_IS_SAME: {
            if (state.openCards.length >= 2) {
                if (state.openCards[0].id === state.openCards[1].id) {
                    return {
                        ...state, data: state.data.map(item => {
                            if (item.id === state.openCards[0].id) {
                                item.isOnBoard = false
                            }
                            return item
                        }), countRight: state.countRight+1, openCards: []
                    }
                } else {
                    setTimeout(() => {
                        state.openCards.forEach(item => item.setOpen(false))
                    }, 500)
                    return {
                        ...state, openCards: []
                    }
                }
            } else {
                return state
            }

        }
        case IS_ALL_GUESSED: {
            if (state.size <= state.countRight) {
                console.log(state.name, state.size, state.timer)
                localStorage.setItem(state.name, JSON.stringify({
                    countOfCards: state.size,
                    time: state.timer
                }))
                return {
                    ...state, endGame: true, data: [], size: 0, countRight: 0, timer: 0, startGame: false
                }
            } else {
                return state
            }
        }
        case SET_TIMER:{
            return {
                ...state, timer: action.payload
            }
        }
        case TIMEOUT:{
            setTimeout(() => {
                state.openCards.forEach(item => item.setOpen(false))
            }, 500)
            return {
                ...state, openCards: []
            }
        }
        case NEW_GAME:{
            return{
                ...state, data: [], size: 0, endGame: false, startGame: false, timer: 0
            }
        }
        default: {
            return state
        }
    }
}

//изменение состояния картотчки (либо отгадана, либо нет)
export const setOnBoard = (id, status) => ({
    type: SET_ON_BOARD, payload: { id, status }
})

//начало игры
export const startGame = (size, name) => ({
    type: START_GAME, payload: {size, name}
})

export const setTimerValue = (time) => ({
    type: SET_TIMER, payload: time
})

const addOpenCard = (id, func) => ({
    type: ADD_OPEN_CARD, payload: { id, setOpen: func }
})

const isSame = () => ({
    type: CHECK_IS_SAME
})

const isAllGuessed = () => ({
    type: IS_ALL_GUESSED
})

export const timeout = () => ({
    type: TIMEOUT
})

export const newGame = () => ({
    type: NEW_GAME
})

export const checkCards = (id, func) => (dispatch) => {
    dispatch(addOpenCard(id, func))
    dispatch(isSame())
    dispatch(isAllGuessed())
}

export default appReducer;