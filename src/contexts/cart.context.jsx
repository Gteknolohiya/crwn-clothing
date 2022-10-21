import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains producToAdd 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // If found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
    }

    // Return array with modified cartItems / New cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

// Remove item to cart
const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    ); 

    // check if quantity is equal to 1, if it is remove that item to cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }  

    // return back cartItems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 } 
    : cartItem
);
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    removeCartItem: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); 
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal]= useState(0);

    // Count the total items in the cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    // Total the cartItems value
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    // Add item to cart
    const addItemToCart =  (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
   }

   // Remove cart item
   const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
   }

   // Remove cart item
   const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
   }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}