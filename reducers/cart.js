import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREMENT_PRODUCT_CART_QUANTITY,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  TOGGLE_CART,
} from '../constants/ActionTypes';

const initialState = {
  isShow: false,
  addedIds: [],
  quantityById: {}
};

function addedIds(state = initialState.addedIds, action, quantity) {
  const index = state.indexOf(action.productId);

  switch (action.type) {
    case ADD_TO_CART:
      if (index !== -1) {
        return state;
      }
      return [...state, action.productId];
    case REMOVE_FROM_CART:
      if (index === -1 || quantity > 0) {
        return state;
      }
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}

function quantityById(state = initialState.quantityById, action) {
  const { productId } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        [productId]: (state[productId] || 0) + 1
      });
    case DECREMENT_PRODUCT_CART_QUANTITY:
      const quantity = state[productId] - 1;
      const newState = Object.assign({}, state);
      if (quantity > 0) {
        newState[productId] = quantity;
      } else {
        delete newState[productId];
      }
      return newState;
    default:
      return state;
  }
}

function isShow(state = initialState.isShow, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return !state;
    default:
      return state;
  }
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action, getQuantity(state, action.productId)),
        quantityById: quantityById(state.quantityById, action),
        isShow: isShow(state.isShow, action)
      };
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0;
}

export function getAddedIds(state) {
  return state.addedIds;
}
