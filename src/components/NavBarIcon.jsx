import React from 'react'
import Row from './Row'
import './Row.css'
import './NavBarIcon.css'

const NavBarIcon = ({text,imgSrc,className, onClick}) => {
  return (
    <Row onClick = {onClick} className={"navBarIcon " + className}>
        <img src={imgSrc} className='navBarIconImage' />
        <p className='navBarIconText'>{text}</p>
    </Row>
  )
}

export default NavBarIcon