import defaultProducts from './products.json';

const TIMEOUT = 100;

export default {
  getProducts(cb, timeout) {
    //  TODO: recalculate qut of eact produsct if have state data in localStorage
    setTimeout(() => cb(defaultProducts), timeout || TIMEOUT);
  },

  buyProducts(payload, cb, timeout) {
    setTimeout(() => cb(), timeout || TIMEOUT);
  },

  saveState(state, cb, timeout) {
    setTimeout(() => {
      localStorage.setItem('state', JSON.stringify(state));
    }, timeout || TIMEOUT);
  }
};
