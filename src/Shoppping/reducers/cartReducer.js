export const cartReducer = (state, action) => {
  const getState = payload => {
    if (payload.qty === 0) {
      return state.cart.filter(c => c.id !== action.payload.id);
    }
    state.cart.forEach(element => {
      if (payload.id === element.id) {
        element.qty = action.payload.qty;
      }
    });
    return state.cart;
  };
  switch (action.type) {
    case "ADD_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(c => c.id !== action.payload.id)
      };
    case "CHANGE_QTY":
      return {
        ...state,
        cart: getState(action.payload)
      };
    default:
      break;
  }
};
