import React from 'react'
import {useState} from 'react'
import ProductShortDisplay from './ProductShortDisplay.jsx'
import "./ProductsRow.css"

const rigtArrowImg = '../../public/right_arrow.png'
const leftArrowImg = '../../public/left_arrow.png'

const ProductsRow = ({products,className,HandleAddItemToCart,maxDisplayedItems}) => {
  const [firstItemIndex, setFirstItemIndex] = useState(0) ;  

  const HandleOnRightArrowClick = () => {
    if(firstItemIndex + maxDisplayedItems < products.length)
      setFirstItemIndex(firstItemIndex + maxDisplayedItems) ;
  }

  const HandleOnLeftArrowClick = () => {
    if(firstItemIndex - maxDisplayedItems >= 0)
      setFirstItemIndex(firstItemIndex - maxDisplayedItems) ;
  }

  return (
      <div className={'products_and_arrows_row ' + className}>
        {(firstItemIndex - maxDisplayedItems >= 0) ? 
          <img className='prev_products_arrow' src={leftArrowImg} onClick={HandleOnLeftArrowClick}/> :
          <img className='empty_arrow'/>
        }
        <div className='products_row'>{
            products.map((product,index) => (index >= firstItemIndex && index < firstItemIndex + maxDisplayedItems) &&
              <ProductShortDisplay className="" product={product} key={product.name} HandleAddItemToCart={HandleAddItemToCart}/>)
            }
        </div>
        {(firstItemIndex + maxDisplayedItems < products.length ) && <img className='next_products_arrow' src={rigtArrowImg} onClick={HandleOnRightArrowClick}/>}
      </div>
  )
}

export default ProductsRow