import React from 'react'
import './PriceRow.css'
import Row from './Row.jsx'

const addToCartImage = '../../public/shopping_cart.png' ;

const PriceRow = ({className,HandleAddItemToCart}) => {
  return (
    <Row className={'price_row ' + className}>
        <p className='price_text'>{(Math.random() * 200).toFixed(2) + ' Lei'}</p>
        <div className='cart_image_container' onClick={HandleAddItemToCart}>
          <img className='cart_image' src = {addToCartImage}/>
        </div>
    </Row>
  )
}

export default PriceRow