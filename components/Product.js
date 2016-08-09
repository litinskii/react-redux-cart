import React, { PropTypes } from 'react';

const Product = ({ price, quantity, title, onRemove, onAdd, disableAddAction }) => (
  <div className="product">
    <span>{title} - &#36;{price} {quantity ? `x ${quantity}` : null}</span>
    {onRemove ? <button className="product__action" onClick={() => onRemove()}>x</button> : null}
    {onAdd ? <button className="product__action"
                     disabled={disableAddAction}
                     onClick={() => onAdd()}>{disableAddAction ? 'Sold Out' : 'Add to cart' }</button> : null}
  </div>
);


Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  disableAddAction: PropTypes.bool
};

export default Product;
