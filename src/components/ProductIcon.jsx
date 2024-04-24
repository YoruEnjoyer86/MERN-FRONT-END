import React from 'react'
import "./ProductIcon.css"
import RatingStars from './RatingStars.jsx'
import PriceRow from './PriceRow.jsx'

const ProductIcon = ({product,className,HandleAddItemToCart}) => {
  return (
    <div className={'product_icon ' + className}>
      <img className='product_icon_image' src={product.image}/>
      <p className='product_icon_text'>{product.name}</p>
      <RatingStars className='margin_bottom' value={Math.floor(Math.random() * 6)}/>
      <PriceRow className='price_row_in_product' HandleAddItemToCart={() => {HandleAddItemToCart(product.name)}}/>
    </div>
  )
}

export default ProductIcon