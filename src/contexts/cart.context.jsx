import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains producToAdd 

    // If found increment quantity

    // Return array with modified cartItems / New cart items
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItem: [],
    addItemToCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen};

    const addItemToCart =  (productToAdd) => {
         
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}