import React from 'react';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './FancyGownCard.css';

const FancyGownCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="fancy-gown-card" onClick={() => navigate(`/product/${product.id}`)}>
      <button 
        className={`favorite-btn ${wishlisted ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
      >
        <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
        
        <div className="card-actions">
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FancyGownCard;
