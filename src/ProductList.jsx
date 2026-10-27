import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (t) => `https://placehold.co/160x160/2f6b4f/ffffff?text=${encodeURIComponent(t)}`;
const make = (list) => list.map(([name, cost, description]) => ({ name, cost, description, image: img(name) }));

const categories = [
  { title: 'Air Purifying', plants: make([
    ['Snake Plant', 15, 'Removes toxins, nearly unkillable'],
    ['Spider Plant', 12, 'Fast growing, pet safe'],
    ['Peace Lily', 18, 'White blooms, loves shade'],
    ['Rubber Plant', 22, 'Glossy leaves, bold look'],
    ['Boston Fern', 14, 'Humidity loving classic'],
    ['Areca Palm', 30, 'Tropical feel indoors'] ]) },
  { title: 'Succulents', plants: make([
    ['Aloe Vera', 10, 'Soothing gel, sun lover'],
    ['Jade Plant', 13, 'Long-lived lucky plant'],
    ['Echeveria', 9, 'Rosette-shaped, compact'],
    ['Haworthia', 8, 'Striped, low light tolerant'],
    ['String of Pearls', 16, 'Trailing bead-like stems'],
    ['Burro\'s Tail', 15, 'Hanging basket favourite'] ]) },
  { title: 'Low Light', plants: make([
    ['ZZ Plant', 20, 'Thrives on neglect'],
    ['Pothos', 11, 'Trailing and forgiving'],
    ['Cast Iron Plant', 24, 'Tough in dark corners'],
    ['Chinese Evergreen', 17, 'Patterned leaves'],
    ['Philodendron', 14, 'Heart-shaped vines'],
    ['Dracaena', 26, 'Tall and architectural'] ]) },
];

export function Navbar({ onNav }) {
  const count = useSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  return (
    <nav className="navbar">
      <span className="brand">Paradise Nursery</span>
      <div className="nav-links">
        <button onClick={() => onNav('home')}>Home</button>
        <button onClick={() => onNav('plants')}>Plants</button>
        <button onClick={() => onNav('cart')} aria-label={`Cart, ${count} items`}>
          🛒 Cart <span className="cart-count">{count}</span>
        </button>
      </div>
    </nav>
  );
}

function ProductList({ onNav }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const inCart = (name) => items.some((i) => i.name === name);

  return (
    <div>
      <Navbar onNav={onNav} />
      <main className="products">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2>{cat.title}</h2>
            <div className="grid">
              {cat.plants.map((p) => (
                <div className="card" key={p.name}>
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <p className="price">${p.cost}</p>
                  <button
                    className="btn btn-primary"
                    disabled={inCart(p.name)}
                    onClick={() => dispatch(addItem(p))}
                  >
                    {inCart(p.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
