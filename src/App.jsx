import React, { useEffect } from 'react';
import { Quotes } from './components/Quotes'
import { Clock } from './components/Clock'
import { MoreInfo } from './components/MoreInfo'

import './Css/App.css'
function App() {
  return (
    <>
      <Quotes/>
      <Clock />
      <MoreInfo />
    </>
  )
}

export default App
