import * as CLOCK_API from '../services/Time'
import { useState, useEffect } from 'react'



export function MoreInfo(isopen={isopen}) {
  const [moreData, setMoreData] = useState()
  
  useEffect(() => {
    CLOCK_API.getTime().then(setMoreData)
  }, [])
  
  if (!moreData) {
    return <div>Loading...</div>
  }

  return (
    
    <div className={isopen.props? 'moreInfo':"moreInfo hidden"}>
        <div className="moreInfo__timezone">
          <p className="moreInfo__tag">current timezone</p>
          <p className="moreInfo__text">{moreData.timezone}</p>
        </div>
        <div className="moreInfo__dayYear">
          <p className="moreInfo__tag">day of the year</p>
          <p className="moreInfo__text">{moreData.day_of_year}</p>
        </div>
        <div className="moreInfo__dayWeek">
          <p className="moreInfo__tag">day of the week</p> 
          <p className="moreInfo__text">{moreData.day_of_week}</p>
        </div>
        <div className="moreInfo__week">
          <p className="moreInfo__tag">week number</p> 
          <p className="moreInfo__text">{moreData.week_number}</p>
        </div>
    </div>
  )
}

