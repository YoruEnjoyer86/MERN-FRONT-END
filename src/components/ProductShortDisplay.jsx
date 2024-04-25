import React, { useState } from 'react'
import "./ProductShortDisplay.css"
import RatingStars from './RatingStars.jsx'
import PriceRow from './PriceRow.jsx'

const favoriteImage = '../../public/favorites_hover.png' ;
const notFavoriteImage = '../../public/favorites.png' ;

const ProductShortDisplay = ({product,className,HandleAddItemToCart}) => {

  const [isFavorite,setFavorite] = useState(false) ;// TODO MOVE STATE UP

  return (
    <div className={'product_short_display ' + className}>
      <div className='favorite_button' onClick={() => {setFavorite(!isFavorite)}}>
        <img className='favorite_button_image' src={(isFavorite ? favoriteImage : notFavoriteImage)}/>
      </div>
      <img className='product_short_display_image' src={product.image}/>
      <p className='product_short_display_text'>{product.name}</p>
      <RatingStars className='margin_bottom' value={Math.floor(Math.random() * 6)}/>
      <PriceRow className='price_row_in_product' HandleAddItemToCart={() => {HandleAddItemToCart(product.name)}}/>
    </div>
  )
}

export default ProductShortDisplay