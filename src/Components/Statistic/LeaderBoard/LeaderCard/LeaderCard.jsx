import React from 'react'
import s from './LeaderCard.module.css'

function LeaderCard(props){
    return(
        <div className={s.wrapper}>
            <span className={`${s.pos} ${s.cut}`} title={`Position: ${props.pos}`}>{props.pos}</span>
            <span className={`${s.field_main} ${s.cut}`} title={`name: ${props.name}`}>{props.name}</span>
            <span className={`${s.field_main} ${s.cut}`} title={`time: ${new Date((props.time+1)*1000).toISOString().substr(11,8)}`}>{new Date((props.time+1)*1000).toISOString().substr(11,8)}</span>
            <span className={`${s.count} ${s.cut}`} title={`Count of cards: ${props.count}`}>{props.count}</span>
        </div>
    )
}

export default LeaderCard;