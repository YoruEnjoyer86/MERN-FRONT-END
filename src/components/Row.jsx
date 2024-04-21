import React from 'react'

export default function Row({children, style, className, onClick})
{
    return (
        <div onClick = {onClick} className = {className} style={{...style, display:'flex'}}>{children}</div>
      )
}
