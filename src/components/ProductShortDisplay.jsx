import React from 'react'
import "./ProductShortDisplay.css"
import RatingStars from './RatingStars.jsx'
import PriceRow from './PriceRow.jsx'

const ProductShortDisplay = ({product,className,HandleAddItemToCart}) => {
  return (
    <div className={'product_short_display ' + className}>
      <img className='product_short_display_image' src={product.image}/>
      <p className='product_short_display_text'>{product.name}</p>
      <RatingStars className='margin_bottom' value={Math.floor(Math.random() * 6)}/>
      <PriceRow className='price_row_in_product' HandleAddItemToCart={() => {HandleAddItemToCart(product.name)}}/>
    </div>
  )
}

export default ProductShortDisplay