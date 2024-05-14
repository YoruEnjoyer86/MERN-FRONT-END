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
          <div className='cls'>
            <img src={src} className='nav_bar_icon_image' />
            {(nrNotifications > 0) && 
              <span className='notification_container'>
                <span className='notification_text'>{nrNotifications}</span>
              </span>
            }
          </div>
        <p className='navBarIconText'>{text}</p>
    </div>
  )
}

export default NavBarIcon