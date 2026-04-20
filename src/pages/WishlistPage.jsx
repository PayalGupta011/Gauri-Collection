import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import FancyGownCard from '../components/FancyGownCard';
import Footer from '../components/Footer';

const WishlistPage = () => {
  const { wishlist } = useShop();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-beige">
      <div className="h-[118px]"></div>

      <div className="bg-softBrown py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-contentWhite">My Wishlist</h1>
        <p className="mt-2 text-goldenYellow/70 font-sans text-xs tracking-[0.4em] uppercase">Saved with Love</p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">
        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Heart size={64} className="mx-auto text-softBrown/20 mb-8" />
            <p className="text-2xl font-serif text-softBrown mb-4">Your wishlist is empty</p>
            <p className="text-softBrown/60 mb-10">Start saving your favorite pieces to find them later.</p>
            <button onClick={() => navigate('/category/all')} className="px-10 py-4 bg-softBrown text-contentWhite font-sans text-xs tracking-[0.3em] uppercase hover:bg-goldenYellow transition-colors duration-300">
              Discover Products
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
            {wishlist.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <FancyGownCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
