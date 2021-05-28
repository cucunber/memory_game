import React, { useEffect } from 'react'
import s from './GuesserTimer.module.css'
import {useDispatch} from 'react-redux'
import {timeout} from '../../../Redux/appReducer'

function GuesserTimer(props){

    const [timer, setTimer] = React.useState(5*100)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.length && timer>0){
            setTimeout(()=>setTimer(timer-10),100)
        } else if(timer===0){
            dispatch(timeout())
            setTimer(5*100)
        } else if(!props.length){
            setTimer(5*100)
        }
    }, [timer, props.length])

    return(
        <div className={s.wrapper}>
            <div className={s.bar} style={{width: timer*(100/(5*100)) + "%"}}>

            </div>
        </div>
    )
}

export default GuesserTimer