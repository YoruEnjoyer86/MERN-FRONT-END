import React from 'react'
import "./ProductIcon.css"

const ProductIcon = ({product,className}) => {
  return (
    <div className={'product_icon ' + className}>{product.name}</div>
  )
}

export default ProductIcon