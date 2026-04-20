import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import FancyGownCard from './FancyGownCard';

const FeaturedProducts = () => {
  const { products } = useShop();
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-[#EDE4D5]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-softBrown/40 font-sans text-[10px] tracking-[0.5em] font-bold uppercase"
            >
              The New Arrivals
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-softBrown mt-4"
            >
              Essential Pieces
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0"
          >
            <button className="text-softBrown border-b border-softBrown/40 pb-1 text-sm font-medium tracking-widest hover:text-goldenYellow hover:border-goldenYellow transition-all duration-300 uppercase">
              EXPLORE ALL COLLECTIONS
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {featured.map((product) => (
            <FancyGownCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
