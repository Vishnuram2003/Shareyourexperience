import React from 'react'
import "./Header.css"
import black from '../../Assets/black3.jpeg'
const Header = () => {
  return (
    <div className='header'>
     <div className="headerTitles">
        <span className='headerTitleSm'>React & Node</span>
        <span className='headerTitleLg'>Blog</span>
    </div> 
    <img className='headerImg' src={black} alt="" />
    </div>
  )
}

export default Header
