import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [page, setPage] = useState('home'); // home | plants | cart

  if (page === 'plants') return <ProductList onNav={setPage} />;
  if (page === 'cart') return <CartItem onNav={setPage} />;

  return (
    <div className="landing">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <p>Healthy houseplants, delivered to your door.</p>
        <button className="btn btn-primary" onClick={() => setPage('plants')}>
          Get Started
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
