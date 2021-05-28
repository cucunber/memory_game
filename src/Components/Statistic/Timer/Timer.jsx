import React, { useEffect } from 'react';
import s from './Timer.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {setTimerValue} from '../../../Redux/appReducer'

function Timer(props){

    let time = useSelector(state=>state.app.timer)

    let [timer, setTimer] = React.useState(time)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.startGame){
            setTimeout(()=>{
                setTimer(timer+1)
                dispatch(setTimerValue(timer))
            },1000)
        }else{
            setTimer(0)
        }
    },[timer, props.startGame])
    return(
        <div className={s.timer}>
            {new Date(timer*1000).toISOString().substr(11,8)}
        </div>
    )
}

export default Timer
