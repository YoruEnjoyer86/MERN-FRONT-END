import React, { useState } from 'react'
import Row from './Row'
import './Row.css'
import './NavBarIcon.css'



const HandleMouseEnter = (setSrc,newImage) => {
  setSrc(newImage) ;
}

const HandleMouseLeave = (setSrc,newImage) => {
  setSrc(newImage) ;
}

const NavBarIcon = ({text,imgSrc,hoverImgSrc,className, onClick}) => {
  const [src,setSrc] = useState(imgSrc) ;
  return (
    <Row onClick = {onClick} className={"navBarIcon " + className} onMouseEnter= {() => {HandleMouseEnter(setSrc,hoverImgSrc)}} onMouseLeave={() => {HandleMouseLeave(setSrc,imgSrc)}}>
        <img src={src} className='navBarIconImage' />
        <p className='navBarIconText'>{text}</p>
    </Row>
  )
}

export default NavBarIcon