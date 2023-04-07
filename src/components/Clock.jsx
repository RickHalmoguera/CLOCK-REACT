import * as CLOCK_API from '../services/Time'
import { useState, useEffect } from 'react'
import Moon from '../assets/desktop/icon-moon.svg'
import Sun from '../assets/desktop/icon-sun.svg'
import dayBackground from '../assets/desktop/bg-image-daytime.jpg'
import nightBackground from '../assets/desktop/bg-image-nighttime.jpg'
import arrowUp from '../assets/desktop/icon-arrow-up.svg'
import arrowDown from '../assets/desktop/icon-arrow-down.svg'

export function Clock({onStateChange}) {
    const [timeData, setTimeData] = useState()
    const [greeting, setGreeting] = useState({})
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [isopen, setIsOpen] = useState(false);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        CLOCK_API.getTime().then((data) => {
          setTimeData(data);
          displayTime(data);
          displayGreeting(data);
        });
      }, 1000);
      
      return () => clearInterval(intervalId);
    }, []);
    
    const displayTime = (data) => {
      setHour(new Date(data.datetime).getHours() < 10 ? '0' + new Date(data.datetime).getHours() : new Date(data.datetime).getHours());
      setMinute(new Date(data.datetime).getMinutes() < 10 ? '0' + new Date(data.datetime).getMinutes() : new Date(data.datetime).getMinutes());
    };

    const displayGreeting = (data) => {
      if (new Date(data.datetime).getHours() > 5 && new Date(data.datetime).getHours() < 12) {
        setGreeting({ icon: Sun, text: 'Good Morning' });
        document.body.style.backgroundImage = `url(${dayBackground})`;
      } else if (new Date(data.datetime).getHours() >= 12 && new Date(data.datetime).getHours() < 18) {
        setGreeting({ icon: Sun, text: 'Good Afternoon' });
        document.body.style.backgroundImage = `url(${dayBackground})`;
      } else {
        setGreeting({ icon: Moon, text: 'Good Evening' });
        document.body.style.backgroundImage = `url(${nightBackground})`;
      }
    };

    const handleClick = () =>{
      setIsOpen(!isopen);
      onStateChange(!isopen);
    }
    
    if (!timeData) {
      return <div>Loading...</div>
    }

    return (
      <>
        <div className={isopen? 'clock alignUp' :'clock'}>
            <p className='clock__greeting'> <img src={greeting.icon} alt="icon"/>{greeting.text}</p>
            <p className='clock__time'>{`${hour}:${minute}`} <span className='clock__standard'>{timeData.abbreviation}</span></p>
            
            <p className='clock__location'>in {timeData.timezone}</p>
        </div>
        <div className='clock__btn' onClick={handleClick}>
          <span className='clock__btn__text'>{isopen? 'less':'more'}</span>
          <img  className={ isopen? 'clock__btn__img inverted':'clock__btn__img'} src={arrowUp} alt="icon"/>
        </div>
      </>
    )
}

