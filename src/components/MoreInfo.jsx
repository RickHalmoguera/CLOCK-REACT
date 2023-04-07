import * as CLOCK_API from '../services/Time'
import { useState, useEffect } from 'react'



export function MoreInfo() {
    const [moreData, setMoreData] = useState()
    

    useEffect(() => {
      CLOCK_API.getTime().then(setMoreData)
    }, [])
    
    if (!moreData) {
      return <div>Loading...</div>
    }
  return (
    <div className='moreInfo'>
        <div className="moreInfo__timezone">
            <p className="timezone__tag">current timezone</p>
            <p className="timezone__text">{moreData.timezone}</p>
        </div>
        <div className="moreInfo__dayYear">
            <p className="dayYear__tag">day of the year</p>
            <p className="dayYear__text">{moreData.day_of_year}</p>
        </div>
        <hr className="moreInfo__divider"/>
        <div className="moreInfo__dayWeek">
            <p className="dayYear__tag">day of the week</p> 
            <p className="dayYear__text">{moreData.day_of_week}</p>
        </div>
        <div className="moreInfo__week">
            <p className="week__tag">week number</p> 
            <p className="week__text">{moreData.week_number}</p>
        </div>
    </div>
  )
}

