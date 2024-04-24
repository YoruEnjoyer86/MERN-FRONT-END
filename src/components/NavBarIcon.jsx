import React, { useState } from 'react'
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
    <div onClick = {onClick} className={"nav_bar_icon " + className} onMouseEnter= {() => {HandleMouseEnter(setSrc,hoverImgSrc)}} onMouseLeave={() => {HandleMouseLeave(setSrc,imgSrc)}}>
        <div>
          <img src={src} className='nav_bar_icon_image' />
          {(nrNotifications > 0) && 
            <div className='notification_container'>
              <p className='notification_text'>{nrNotifications}</p>
            </div>
          }
        </div>
        <p className='navBarIconText'>{text}</p>
    </div>
  )
}

export default NavBarIcon