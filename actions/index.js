import shop from '../api/shop';
import * as types from '../constants/ActionTypes';

export function toggleCart() {
  return (dispatch, getState) => {
    dispatch({
      type: types.TOGGLE_CART
    });
    shop.saveState(getState());
  };
}

function receiveProducts(products) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products
  };
}

export function getAllProducts() {
  return dispatch => {
    shop.getProducts(products => {
      dispatch(receiveProducts(products));
    });
  };
}

function addToCartUnsafe(productId) {
  return {
    type: types.ADD_TO_CART,
    productId
  };
}

export function addToCart(productId) {
  return (dispatch, getState) => {
    if (getState().products.byId[productId].inventory > 0) {
      dispatch(addToCartUnsafe(productId));
      shop.saveState(getState());
    }
  };
}

function decrementProductCartQuantity(productId) {
  return {
    type: types.DECREMENT_PRODUCT_CART_QUANTITY,
    productId
  };
}

function removeFromCartUnsafe(productId) {
  return {
    type: types.REMOVE_FROM_CART,
    productId
  };
}

export function removeFromCart(productId) {
  return (dispatch, getState) => {
    dispatch(decrementProductCartQuantity(productId));
    dispatch(removeFromCartUnsafe(productId));
    shop.saveState(getState());
  };
}

export function checkout(products) {
  return (dispatch, getState) => {
    const cart = getState().cart;
    dispatch({
      type: types.CHECKOUT_REQUEST
    });
    shop.buyProducts(products, () => {
      dispatch({
        type: types.CHECKOUT_SUCCESS,
        cart
      });
    });
  };
}

