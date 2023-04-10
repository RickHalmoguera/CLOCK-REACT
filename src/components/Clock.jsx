import * as CLOCK_API from '../services/Time'
import { useState, useEffect } from 'react'
import Moon from '../assets/desktop/icon-moon.svg'
import Sun from '../assets/desktop/icon-sun.svg'
import dayBackgroundDesktop from '../assets/desktop/bg-image-daytime.jpg'
import nightBackgroundDesktop from '../assets/desktop/bg-image-nighttime.jpg'
import dayBackgroundMobile from '../assets/mobile/bg-image-daytime.jpg'
import nightBackgroundMobile from '../assets/mobile/bg-image-nighttime.jpg'
import dayBackgroundTablet from '../assets/tablet/bg-image-daytime.jpg'
import nightBackgroundTablet from '../assets/tablet/bg-image-nighttime.jpg'
import arrowUp from '../assets/desktop/icon-arrow-up.svg'

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
        if(window.innerWidth < 500){
          document.body.style.backgroundImage = `url(${dayBackgroundMobile})`;
        }else if(window.innerWidth > 500 && window.innerWidth< 1000){
          document.body.style.backgroundImage = `url(${dayBackgroundTablet})`;
        }else{
          document.body.style.backgroundImage = `url(${dayBackgroundDesktop})`;
        }
        
      } else if (new Date(data.datetime).getHours() >= 12 && new Date(data.datetime).getHours() < 18) {
        setGreeting({ icon: Sun, text: 'Good Afternoon' });
        if(window.innerWidth < 500){
          document.body.style.backgroundImage = `url(${dayBackgroundMobile})`;
        }else if(window.innerWidth > 500 && window.innerWidth< 1000){
          document.body.style.backgroundImage = `url(${dayBackgroundTablet})`;
        }else{
          document.body.style.backgroundImage = `url(${dayBackgroundDesktop})`;
        }
      } else {
        setGreeting({ icon: Moon, text: 'Good Evening' });
        if(window.innerWidth < 500){
          document.body.style.backgroundImage = `url(${nightBackgroundMobile})`;
        }else if(window.innerWidth > 500 && window.innerWidth< 1000){
          document.body.style.backgroundImage = `url(${nightBackgroundTablet})`;
        }else{
          document.body.style.backgroundImage = `url(${nightBackgroundDesktop})`;
        }
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

