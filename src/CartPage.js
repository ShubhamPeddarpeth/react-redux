// CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeFromCart, updateQuantity } from './productsSlice';
import './CartPage.css'
const CartPage = () => {
    const cart = useSelector(selectCart);
    console.log('cartPage',cart)
    const dispatch = useDispatch();
    if (!cart || cart.length === 0) {
        return <p>No items in the cart.</p>;
    }
    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };

    // In CartPage.js
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const subtotal = item.price * item.quantity;
            return isNaN(subtotal) ? total : total + subtotal;
        }, 0);
    };
    const calculateSubtotal = (item) => {
        const subtotal = item.price * item.quantity;
        return isNaN(subtotal) ? 0 : subtotal;
    };
    console.log(cart)
    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.map((item) => (
                <div key={item.id}>
                    {/* Display item information */}
                    <img src={item.thumbnail} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>

                    {/* Quantity input */}
                    <label>Quantity: </label>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                        }
                    />

                    {/* Remove button */}
                    <button onClick={() => handleRemove(item.id)}>Remove</button>

                    {/* Subtotal */}
                    <p>Subtotal: ${calculateSubtotal(item)}</p>
                </div>
            ))}
            {/* Shipping and Total Amount */}
            <p>Shipping: Free</p>
            <p>Total Amount: ${calculateTotal()}</p>
        </div>
    );
};

export default CartPage;
