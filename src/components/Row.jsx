import React from 'react'
import "./Row.css"

export default function Row({children, style, className, onClick, onMouseEnter, onMouseLeave})
{
    return (
        <div onClick = {onClick} className = {"row " + className} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>
      )
}
