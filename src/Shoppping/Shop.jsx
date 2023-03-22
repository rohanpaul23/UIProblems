import React, { useEffect, useReducer } from "react";
import axios from "axios";
import "./shop.css";
import { cartReducer } from "./reducers/cartReducer";

const Shop = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: []
  });

  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://dummyjson.com/products";
        const { data } = await axios.get(url);
        dispatch({
          type: "ADD_PRODUCTS",
          payload: data.products
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = item => {
    let cartItem = {};
    cartItem.id = item.id;
    cartItem.title = item.title;
    cartItem.description = item.description;
    cartItem.price = item.price;
    cartItem.qty = 1;
    dispatch({
      type: "ADD_TO_CART",
      payload: cartItem
    });
  };
  const removeFromCart = item => {
    let cartItem = {};
    cartItem.id = item.id;
    cartItem.title = item.title;
    cartItem.description = item.description;
    cartItem.price = item.price;
    cartItem.qty = 1;
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: cartItem
    });
  };

  const getAddOrRemove = item => {
    let cartItems = state.cart;
    let itemExists = cartItems.filter(cartItem => cartItem.id === item.id)[0];
    if (itemExists === undefined) {
      return (
        <span>
          <button type="button" onClick={() => addToCart(item)}>
            AddToCart
          </button>
        </span>
      );
    } else {
      return (
        <span>
          <button type="button" onClick={() => removeFromCart(item)}>
            RemoveFromCart
          </button>
        </span>
      );
    }
  };

  const getCartTotal = () => {
    let cartItems = state.cart;
    let total = 0;
    cartItems.forEach(item => {
      total = total + item.price * item.qty;
    });
    return total;
  };

  const increaseQty = item => {
    let cartItem = {};
    cartItem.id = item.id;
    cartItem.title = item.title;
    cartItem.description = item.description;
    cartItem.price = item.price;
    cartItem.qty = item.qty + 1;
    dispatch({
      type: "CHANGE_QTY",
      payload: cartItem
    });
  };

  const decreaseQty = item => {
    let cartItem = {};
    cartItem.id = item.id;
    cartItem.title = item.title;
    cartItem.description = item.description;
    cartItem.price = item.price;
    cartItem.qty = item.qty - 1;
    dispatch({
      type: "CHANGE_QTY",
      payload: cartItem
    });
  };

  return (
    <div className="productsAndCart">
      <div className="allProducts">
        <div className="movie_items">
          <ul>
            {state.products.map(item => {
              return (
                <li className="liItem" key={item.id}>
                  <span>{item.title}</span>
                  <div>{getAddOrRemove(item)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="cartSection">
        <div className="cartTotal">
          <label>CartTotal</label>
          <span>{getCartTotal()}</span>
        </div>
        <ul>
          {state.cart.map(item => {
            return (
              <li className="cartItem">
                <span>{item.title}</span>
                <span>{item.price}</span>
                <label>Qty</label>
                <span>
                  <button onClick={() => decreaseQty(item)}>-</button>
                </span>
                <span>{item.qty}</span>
                <span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
