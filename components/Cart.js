import React, { PropTypes } from 'react';
import Product from './Product';

const Cart = ({ products, total, onCheckoutClicked, onProductInCartRemove }) => (
  <div>
    <div>
      {products.length === 0 ?
        <em>Please add some products to cart.</em> :
        products.map(product =>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            onRemove={() => onProductInCartRemove(product.id)}
            key={product.id}/>)
      }
    </div>
    <p>Total: &#36;{total}</p>
    <button onClick={onCheckoutClicked} disabled={products.length > 0 ? '' : 'disabled'}>
      Checkout
    </button>
  </div>
);

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  onProductInCartRemove: PropTypes.func
};

export default Cart;
