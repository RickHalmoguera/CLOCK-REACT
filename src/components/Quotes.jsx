import * as API from '../services/Quotes'
import { useState, useEffect } from 'react'
import refreshBtn from '../assets/desktop/icon-refresh.svg'



export function Quotes() {
    const [quoteData, setQuoteData] = useState()
    

    useEffect(() => {
      API.getRandomQuote().then(setQuoteData)
    }, [])
    
    const handleClick = () => {
      API.getRandomQuote().then(setQuoteData)
    }
    
    if (!quoteData) {
      return <div>Loading...</div>
    }
  return (
    <div className='quote'>
        <p className='quote__text'>"{quoteData.content}"</p>
        <p className='quote__author'>{quoteData.author }</p>
        <img onClick={handleClick} className='quote__btn' src={refreshBtn} alt='refresh button' />
    </div>
  )
}


