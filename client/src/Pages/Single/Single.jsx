import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Singlepost from '../../Components/Singlepost/Singlepost'
import './Single.css'
const Single = () => {
  return (
    <div className='single'>
        <Singlepost/>
      <Sidebar/>
    </div>
  )
}

export default Single;
