import React from 'react'
import Column from './Column.jsx'
import "./ProductIcon.css"
import RatingStars from './RatingStars.jsx'

const ProductIcon = ({product,className}) => {
  return (
    <Column className={'product_icon ' + className}>
      <img className='product_icon_image' src={product.image}/>
      <p className='product_icon_text'>{product.name}</p>
      <RatingStars value={Math.floor(Math.random() * 6)}/>
    </Column>
  )
}

export default ProductIcon