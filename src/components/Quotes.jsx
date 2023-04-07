import * as API from '../services/Quotes'
import { useState, useEffect } from 'react'



export function Quotes() {
    const [quoteData, setQuoteData] = useState()
    

    useEffect(() => {
      API.getRandomQuote().then(setQuoteData)
    }, [])
    
    if (!quoteData) {
      return <div>Loading...</div>
    }
  return (
    <div className='quote'>
        <p className='quote__text'>"{quoteData.content}"</p>
        <p className='quote__author'>{quoteData.author }</p>
    </div>
  )
}


