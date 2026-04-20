import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingBag, Heart, ArrowLeft, Star, Plus, Minus, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import FancyGownCard from '../components/FancyGownCard';
import Footer from '../components/Footer';
import './ProductPage.css';

const SimilarProducts = ({ category, currentId }) => {
  const { products } = useShop();
  const similar = products
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, 4);

  return (
    <div className="mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif text-softBrown mb-12 text-center"
      >
        Similar Creations
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {similar.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <FancyGownCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isWishlisted } = useShop();
  const product = products.find(p => p.id === parseInt(id));
  
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState('#D4AF37');
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock thumbnails
  const thumbnails = [product?.image, product?.image, product?.image, product?.image];
  const colors = ['#D4AF37', '#8B6F47', '#EBE4D8', '#2C2C2C'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setMainImage(product?.image);
    setQty(1);
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 800);
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <p className="text-2xl font-serif text-softBrown">Creation not found.</p>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-beige font-poppins">
      <div className="h-[118px]"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-12 pb-32 md:pb-20">
        {/* Breadcrumb / Back */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-softBrown/50 hover:text-softBrown mb-10 text-xs tracking-[0.2em] uppercase transition-all"
        >
          <ArrowLeft size={14} /> Back to Collection
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* LEFT SIDE: Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm group">
              {!isLoaded && <div className="skeleton absolute inset-0 z-10" />}
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover cursor-zoom-in"
                  whileHover={{ scale: 1.05 }}
                />
              </AnimatePresence>
              
              {/* Floating Share */}
              <button className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-softBrown shadow-sm hover:bg-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {thumbnails.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`thumbnail-box ${mainImage === img && idx === 0 ? 'active' : ''}`} // Simplistic active check
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col py-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-goldenYellow text-[10px] tracking-[0.5em] font-bold uppercase">{product.tag}</span>
                <h1 className="text-4xl md:text-5xl font-serif text-softBrown mt-4 leading-tight">{product.name}</h1>
              </div>
              <motion.button
                whileTap={{ scale: 1.5 }}
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-full shadow-sm transition-all duration-300 ${wishlisted ? 'bg-goldenYellow/10 text-goldenYellow' : 'bg-white text-softBrown/30'}`}
              >
                <Heart size={24} fill={wishlisted ? 'currentColor' : 'none'} className="transition-colors" />
              </motion.button>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-goldenYellow text-goldenYellow" />)}
              </div>
              <span className="text-softBrown/40 text-xs font-medium ml-2 border-l border-softBrown/10 pl-3">4.9 (128 Reviews)</span>
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <p className="text-4xl font-serif text-goldenYellow font-bold italic">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-softBrown/30 line-through text-lg">₹{(product.price + 5000).toLocaleString('en-IN')}</p>
              <span className="bg-green-50 text-green-600 text-[10px] px-2 py-1 rounded-full font-bold">SAVE ₹5,000</span>
            </div>

            <p className="mt-8 text-softBrown/70 font-sans text-sm leading-relaxed max-w-xl">
              An exquisite masterpiece from our premium collection. Each thread tells a story of heritage and craftsmanship, meticulously hand-finished by master artisans. Perfect for celebrations that demand timeless elegance.
            </p>

            {/* Colors */}
            <div className="mt-10">
              <p className="text-[10px] font-bold tracking-[0.2em] text-softBrown/40 uppercase mb-4">Color Palette</p>
              <div className="flex gap-4">
                {colors.map(color => (
                  <div 
                    key={color} 
                    className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-10 flex items-center gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold tracking-[0.2em] text-softBrown/40 uppercase">Quantity</p>
                <div className="flex items-center gap-6 bg-white p-2 rounded-full shadow-sm w-fit border border-softBrown/5">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn"><Minus size={14} /></button>
                  <span className="w-6 text-center font-bold text-softBrown">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="qty-btn"><Plus size={14} /></button>
                </div>
              </div>
            </div>

            {/* Actions Desktop */}
            <div className="mt-12 hidden md:flex gap-6">
              <button
                onClick={() => { for(let i = 0; i < qty; i++) addToCart(product); navigate('/checkout'); }}
                className="flex-[2] btn-buy-now"
              >
                Buy Now
              </button>
              <button
                onClick={() => { for(let i = 0; i < qty; i++) addToCart(product); }}
                className="flex-1 btn-add-to-cart"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        <SimilarProducts category={product.category} currentId={product.id} />
      </div>

      {/* Sticky Mobile Actions */}
      <div className="sticky-actions md:hidden">
        <button
          onClick={() => { for(let i = 0; i < qty; i++) addToCart(product); }}
          className="flex-1 py-4 border border-softBrown text-softBrown font-bold text-xs tracking-widest uppercase rounded-sm"
        >
          Cart
        </button>
        <button
          onClick={() => { for(let i = 0; i < qty; i++) addToCart(product); navigate('/checkout'); }}
          className="flex-[2] gold-shimmer py-4 text-white font-bold text-xs tracking-widest uppercase rounded-sm shadow-lg"
        >
          Buy Now
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
