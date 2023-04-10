import React, { useState } from 'react';
import { Quotes } from './components/Quotes'
import { Clock } from './components/Clock'
import { MoreInfo } from './components/MoreInfo'

import './Css/App.css'


function App() {
  const [isopen, setIsOpen] = useState(false);

  const handleStateChange = (newState) => {
    setIsOpen(newState);
    
  };
  return (
    <div className= {isopen? 'appOpen':'app'}>
      <Quotes props ={isopen}/>
      <Clock  onStateChange={handleStateChange} props={isopen}/>
      <MoreInfo  props ={isopen}/>
    </div>
  )
}

export default App
