import React from 'react'
import ProductIcon from './ProductIcon.jsx'
import Row from "./Row.jsx"
import "./ProductsRow.css"

const ProductsRow = ({products,className}) => {
  return (
    <Row className = {className}>
        {products.map((product) => <ProductIcon className="products_row_item" product={product} key={product.name}/>)}
    </Row>
  )
}

export default ProductsRow