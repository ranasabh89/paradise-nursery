import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

function CartItem({ onNav }) {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, i) => sum + i.cost * i.quantity, 0);

  const change = (item, q) =>
    q < 1 ? dispatch(removeItem(item.name)) : dispatch(updateQuantity({ name: item.name, quantity: q }));

  return (
    <div>
      <Navbar onNav={onNav} />
      <main className="cart">
        <h2>Shopping Cart</h2>
        {items.length === 0 && <p>Your cart is empty. Browse the plants to add some.</p>}
        {items.map((item) => (
          <div className="cart-row" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div className="qty">
                <button className="btn btn-success" onClick={() => change(item, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button className="btn btn-success" onClick={() => change(item, item.quantity + 1)}>+</button>
              </div>
              <p>Total: ${item.cost * item.quantity}</p>
            </div>
            <button className="btn btn-danger" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        ))}
        <h3 className="cart-total">Total cart amount: ${total}</h3>
        <div className="cart-actions">
          <button className="btn btn-primary" onClick={() => onNav('plants')}>Continue Shopping</button>
          <button className="btn btn-success" onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
