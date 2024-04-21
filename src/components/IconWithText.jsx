import React from 'react'
import Row from './Row'
import './Row.css'

const IconWithText = ({text,style,imgSrc,className, onClick}) => {
  return (
    <Row onClick = {onClick} className={"centered " + className}style={{...style, flexWrap: "nowrap"}}>
        <img src={imgSrc} style = {{height: "100%", width:"50%", objectFit : 'contain'}}/>
        <p style={{height:"fit-content", width:"fit-content", marginLeft:"20px"}}>{text}</p>
    </Row>
  )
}

export default IconWithText