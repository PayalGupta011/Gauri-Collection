import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

import FancyGownCard from '../components/FancyGownCard';

const categoryMap = {
  'all': 'All Categories',
  'fancy-gowns': 'Fancy Gowns',
  'saree-lehenga': 'Saree & Lehenga',
  'handloom': 'Handloom',
  'bedding': 'Bedding',
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { products } = useShop();
  const categoryLabel = categoryMap[slug] || 'All Categories';

  const filtered = slug === 'all'
    ? products
    : products.filter(p => p.category === categoryMap[slug]);

  const displayProducts = filtered.length > 0 ? filtered : products;

  const isFancyGown = slug === 'fancy-gowns';

  return (
    <div className="min-h-screen bg-beige">
      <div className="h-[118px]"></div>

      {/* Category Hero Banner */}
      <div className="bg-softBrown py-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-goldenYellow font-sans text-xs tracking-[0.4em] font-medium uppercase"
        >
          Gauri Collection
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-contentWhite mt-4 tracking-wide"
        >
          {categoryLabel}
        </motion.h1>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {displayProducts.map((product, i) => (
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

        {displayProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl font-serif text-softBrown">
              Coming Soon...
            </p>
            <p className="mt-4 text-softBrown/60 font-sans">
              We're curating something special for you.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
