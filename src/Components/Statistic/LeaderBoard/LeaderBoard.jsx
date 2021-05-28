import React from 'react';
import s from './LeaderBoard.module.css';
import LeaderCard from './LeaderCard/LeaderCard';

function LeaderBoard(props){  
    const toShow = 10
    let [data, setData] = React.useState([])
    React.useEffect(()=>{
        let results = []
        for(let i = 0; i<localStorage.length; i++){
            if(props.show===''){
                results.push([localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i)))])
            } else if(JSON.parse(localStorage.getItem(localStorage.key(i))).countOfCards===props.show){
                results.push([localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i)))])
            }
        }
        setData(results)
        props.setCountLeaders(results.length)
    },[localStorage.length, props.show])

    return(
        <div className={s.wrapper}>
            {data.sort((a,b)=>a[1].time-b[1].time).slice(props.start*toShow, props.start*toShow+toShow).filter(item=>props.show === '' ? item : item[1].countOfCards===props.show).map((item, key)=><LeaderCard key={`leader${key+1}`} pos={key+1+props.start*toShow} name={item[0]} time={item[1].time} count={item[1].countOfCards}/>)}
        </div>
    )
}

export default LeaderBoard