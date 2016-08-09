import React, { PropTypes } from 'react';
import Product from './Product';

const ProductItem = ({ product, onAddToCartClicked }) => (
  <Product
    disableAddAction={product.inventory <= 0}
    onAdd={onAddToCartClicked}
    title={product.title}
    price={product.price}/>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
};

export default ProductItem;
