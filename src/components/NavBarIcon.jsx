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

const NavBarIcon = ({text,imgSrc,hoverImgSrc,className, onClick, nrNotifications}) => {
  const [src,setSrc] = useState(imgSrc) ;
  return (
    <Row onClick = {onClick} className={"navBarIcon " + className} onMouseEnter= {() => {HandleMouseEnter(setSrc,hoverImgSrc)}} onMouseLeave={() => {HandleMouseLeave(setSrc,imgSrc)}}>
        <div>
          <img src={src} className='navBarIconImage' />
          {(nrNotifications > 0) && 
            <div className='notification_container'>
              <p className='notification_text'>{nrNotifications}</p>
            </div>
          }
        </div>
        <p className='navBarIconText'>{text}</p>
    </Row>
  )
}

export default NavBarIcon