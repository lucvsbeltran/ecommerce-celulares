import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM":
      const exist = state.cartItems.find(item => item._id === action.payload._id);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => 
            item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
          )
        };
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, qty: 1 }] };
    
    case "REMOVE_ITEM":
      return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload) };
    
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
