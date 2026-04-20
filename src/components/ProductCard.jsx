import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-beige/30 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        {/* Tag */}
        <span className="absolute top-4 left-4 z-10 bg-goldenYellow text-contentWhite text-[10px] px-3 py-1 font-sans tracking-widest uppercase italic">
          {product.tag}
        </span>

        {/* Wishlist toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow transition-all duration-300 ${wishlisted ? 'bg-goldenYellow text-contentWhite' : 'bg-contentWhite/80 text-softBrown hover:bg-goldenYellow hover:text-contentWhite'}`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Main Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Overlay Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex w-full">
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="flex-1 bg-softBrown/95 text-contentWhite py-4 text-[9px] font-sans tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-softBrown btn-premium border-r border-contentWhite/10 uppercase"
            >
              <ShoppingBag size={12} /> Add to Cart
            </button>
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                addToCart(product); 
                navigate('/checkout');
              }}
              className="flex-1 gold-shimmer text-contentWhite py-4 text-[9px] font-sans tracking-[0.2em] font-bold flex items-center justify-center gap-2 btn-premium uppercase shadow-inner"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5 text-center">
        <h3 className="text-base font-serif text-softBrown tracking-wide">
          {product.name}
        </h3>
        <p className="mt-2 text-goldenYellow font-sans font-semibold tracking-widest">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
