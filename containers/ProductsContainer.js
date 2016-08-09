import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions';
import { getVisibleProducts } from '../reducers/products';
import ProductItem from '../components/ProductItem';

const ProductsContainer = ({ products, addToCart }) => (
  <div>
    <h3>Products</h3>
    <div>{products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => addToCart(product.id)}/>
    )}</div>
  </div>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
};


export default connect(
  (state) => {
    return { products: getVisibleProducts(state.products) };
  },
  { addToCart }
)(ProductsContainer);
