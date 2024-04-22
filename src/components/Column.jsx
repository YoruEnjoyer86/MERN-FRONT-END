import React from 'react'
import "./Column.css"

export const Column = ({children,className}) => {
  return (
    <div className={'column ' + className}>{children}</div>
  )
}

export default Column
