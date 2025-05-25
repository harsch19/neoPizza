import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';

import logo from './images/neo_logo.jpg'
import facebook from './images/facebook.svg';
import instagram from './images/instagram.svg';
import pizza from './images/pizza.jpg';
import brownie from './images/brownie.jpg';
import salad from './images/salad.jpg';
import soup from './images/soup.jfif';
import garlicbread from './images/garlic_bread.webp';
import chinese from './images/chinese.jpg';
import colddrink from './images/cold_drink.jpg';
import phoneCall from './images/phone-call.png';
import map from './images/google-maps.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

const buffetDishes = [
  {
    name: 'Soup',
    image: soup,
    description: 'Choose from 2 types of delicious, freshly made soups to start your meal.'
  },
  {
    name: 'Garlic Bread',
    image: garlicbread,
    description: 'Enjoy 2 varieties of warm, crispy garlic bread, perfect with any dish.'
  },
  {
    name: 'Salad',
    image: salad,
    description: '16 healthy cold salads, made with fresh veggies and unique dressings.'
  },
  {
    name: 'Hot Mains',
    image: chinese,
    description: '4 hot Chinese mains, full of flavor and perfect for every palate.'
  },
  {
    name: 'Pizza',
    image: pizza,
    description: '4 types of pizzas, baked to perfection with a variety of toppings.'
  },
  {
    name: 'Brownie with Ice Cream',
    image: brownie,
    description: 'End your meal with a delicious brownie topped with creamy ice cream.'
  },
  {
    name: 'Cold Drinks',
    image: colddrink,
    description: 'Unlimited cold drinks to refresh you throughout your buffet experience.'
  }
];

// Mock menu items for A la Carte
const alacarteMenu = [
  { name: 'Margherita Pizza', price: '₹249', description: 'Classic cheese & tomato pizza with fresh basil.' },
  { name: 'Paneer Tikka Pizza', price: '₹299', description: 'Spicy paneer tikka, onions, and capsicum.' },
  { name: 'Veggie Supreme', price: '₹279', description: 'Loaded with fresh veggies and mozzarella.' },
  { name: 'Garlic Breadsticks', price: '₹129', description: 'Crispy, buttery garlic breadsticks.' },
  { name: 'Brownie Sundae', price: '₹149', description: 'Warm brownie with vanilla ice cream.' },
];

Modal.setAppElement('#root');

function App() {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '8600260360';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  
  const contactMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactMenuOpen && contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setContactMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contactMenuOpen]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const openModal = (dish) => {
    setSelectedDish(dish);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Neopolitan Pizza Logo" className="logo" />
        {/* <h1>Neopolitan Pizza</h1>
        <p className="subtitle">Unlimited Buffet & A la Carte</p> */}
      </header>
      <main>
        <section className="buffet-highlight">
          <h2>Unlimited Buffet</h2>
          <div className="buffet-pricing">
            <div className="buffet-pricing-left">
              <h3>Afternoon Prices</h3>
              <p>Adults: ₹250</p>
              <p>Kids: ₹200</p>
            </div>
            <div className="buffet-pricing-right">
              <h3>Evening Prices</h3>
              <p>Adults: ₹350</p>
              <p>Kids: ₹300</p>
            </div>
          </div>
          <Slider {...sliderSettings} className="buffet-carousel">
            {buffetDishes.map((dish, idx) => (
              <div key={idx} className="buffet-card" onClick={() => openModal(dish)}>
                <img src={dish.image} alt={dish.name} className="buffet-card-img" />
                <div className="buffet-card-title">{dish.name}</div>
              </div>
            ))}
          </Slider>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel={selectedDish ? selectedDish.name : ''}
            className="dish-modal"
            overlayClassName="dish-modal-overlay"
          >
            {selectedDish && (
              <div className="modal-content">
                <img src={selectedDish.image} alt={selectedDish.name} className="modal-img" />
                <h3>{selectedDish.name}</h3>
                <p>{selectedDish.description}</p>
                <button onClick={closeModal} className="modal-close">Close</button>
              </div>
            )}
          </Modal>
        </section>
        <section className="alacarte">
          <h2>A la Carte</h2>
          <p>Prefer to order individually? Explore our delicious menu and pick your favorites!</p>
          <div className="alacarte-menu">
            {alacarteMenu.map((item, idx) => (
              <div className="alacarte-menu-item" key={idx}>
                <div className="alacarte-menu-title">{item.name} <span className="alacarte-menu-price">{item.price}</span></div>
                <div className="alacarte-menu-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-contact">
          <div>
          <a href="https://maps.app.goo.gl/dkQhnwaYtK8Eczia9" target="_blank" rel="noopener noreferrer">
            <img src={map} alt="Google Maps" width="24" height="24" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          </a>
            <b>Address:</b> Shop No :1-2, Golden Venture, Gurukrupa Housing Society, Near Jagtap dairy Chowk, Wakad, Pune
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
            <img src={facebook} alt="Facebook" width="28" height="28" />
          </a>
          <a href="https://instagram.com/neopolitanpizza" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={instagram} alt="Instagram" width="28" height="28" />
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Neopolitan Pizza Cafe. All rights reserved.</p>
        <div className={`contact-pull-menu${contactMenuOpen ? ' open' : ''}`} ref={contactMenuRef}>
          <div className="contact-pull-arrow" onClick={() => setContactMenuOpen(!contactMenuOpen)}>
            {contactMenuOpen ? (
              <span style={{ color: '#fff' }}>&#10005;</span>
            ) : (
              <img src={phoneCall} alt="Call" width="34" height="34" style={{ background: '#fff' }} />
            )}
          </div>
          <div className="contact-pull-content">
            <h2>Call us for party inquiries or pre bookings:</h2>
            <div className="contact-number">
              <img src={phoneCall} alt="Phone" width="24" height="24" style={{ marginRight: '8px' }} />
              <a
                href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`}
                onClick={handleContactClick}
                className={copied ? 'copied' : ''}
                style={{ fontSize: '2rem', color: '#556b2f', textDecoration: 'none', fontWeight: 700 }}
              >
                {phoneNumber}
              </a>
              {copied && <span className="copy-tooltip">Copied!</span>}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
