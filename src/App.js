import React, { useState } from 'react';
import './App.css';

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function App() {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+1 234 567 890';

  const handleContactClick = (e) => {
    if (isMobileDevice()) {
      // On mobile, let the default <a href="tel:"> behavior work
      return;
    } else {
      // On desktop, copy to clipboard
      e.preventDefault();
      navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/images/logo.png" alt="Neopolitan Pizza Logo" className="logo" />
        <h1>Neopolitan Pizza</h1>
        <p className="subtitle">Unlimited Buffet & A la Carte</p>
      </header>
      <main>
        <section className="buffet-highlight">
          <h2>Unlimited Buffet</h2>
          <ul>
            <li><b>2</b> types of soups</li>
            <li><b>2</b> types of garlic breads</li>
            <li><b>16</b> healthy cold salads</li>
            <li><b>4</b> hot Chinese mains</li>
            <li><b>4</b> types of pizzas</li>
            <li><b>Cold drinks</b></li>
            <li><b>Brownie with ice cream</b> for dessert</li>
          </ul>
          <div className="dish-gallery">
            <img src="/images/dishes/soup.jpg" alt="Soup" />
            <img src="/images/dishes/garlicbread.jpg" alt="Garlic Bread" />
            <img src="/images/dishes/salad.jpg" alt="Salad" />
            <img src="/images/dishes/chinese.jpg" alt="Chinese Main" />
            <img src="/images/dishes/pizza.jpg" alt="Pizza" />
            <img src="/images/dishes/brownie.jpg" alt="Brownie with Ice Cream" />
          </div>
        </section>
        <section className="alacarte">
          <h2>A la Carte</h2>
          <p>Prefer to order individually? Explore our delicious menu and pick your favorites!</p>
        </section>
      </main>
      <footer>
        <div className="footer-contact">
          <div>
            <b>Address:</b> 123 Main Street, Your City, Country
          </div>
          <div>
            <b>Contact:</b>{' '}
            <a
              href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`}
              onClick={handleContactClick}
              className={copied ? 'copied' : ''}
            >
              {phoneNumber}
            </a>
            {copied && <span className="copy-tooltip">Copied!</span>}
          </div>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com/neopolitanpizza" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com/neopolitanpizza" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Neopolitan Pizza Cafe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
