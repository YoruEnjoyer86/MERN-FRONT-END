import React from 'react'
import "./Row.css"

export default function Row({children, style, className, onClick})
{
    return (
        <div onClick = {onClick} className = {"row " + className} style={style}>{children}</div>
      )
}
