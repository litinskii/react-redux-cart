import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkout, toggleCart, removeFromCart } from '../actions';
import { getTotal, getCartProducts, isShowCart } from '../reducers';
import Cart from '../components/Cart';

const CartContainer = ({ products, total, toggleCart, checkout, isShowCart, removeFromCart }) => (
  <div>
    <a href="#" onClick={e => {
      e.preventDefault();
      toggleCart();
    }}>
      Shopping cart ({products.length})
    </a>
    {isShowCart ? <Cart
      products={products}
      total={total}
      isShowCart={isShowCart}
      onProductInCartRemove={removeFromCart}
      onCheckoutClicked={checkout}/>
      : null}
  </div>
);

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  isShowCart: PropTypes.bool.isRequired
};

export default connect(
  (state) => {
    return {
      products: getCartProducts(state),
      total: getTotal(state),
      isShowCart: isShowCart(state)
    };
  },
  {
    checkout,
    toggleCart,
    removeFromCart
  }
)(CartContainer);
