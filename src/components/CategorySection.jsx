import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: 'FANCY GOWNS',
    image: '/western.png',
    link: '#',
  },
  {
    id: 2,
    title: 'SAREE & LEHENGA',
    image: '/ethnic.png',
    link: '#',
  },
  {
    id: 3,
    title: 'HANDLOOM',
    image: '/saree.png',
    link: '#',
  },
  {
    id: 4,
    title: 'DESIGNER KURTIS',
    image: '/kurti.png',
    link: '#',
  },
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-contentWhite">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-goldenYellow font-sans text-sm tracking-[0.3em] font-medium uppercase"
          >
            Curated Collections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-softBrown mt-4"
          >
            Explore Our Heritage
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4] rounded-t-full border border-softBrown/10 bg-contentWhite flex flex-col items-center shadow-lg transition-shadow duration-500 group-hover:shadow-goldenYellow/10">
                {/* Image with Arch Effect */}
                <motion.div 
                  className="w-full h-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </motion.div>
                
                {/* Overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-softBrown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-center pb-8 p-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-contentWhite text-softBrown px-6 py-2 text-xs font-sans tracking-[0.15em] font-medium"
                  >
                    VIEW ALL
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-lg font-serif text-softBrown tracking-wide group-hover:text-goldenYellow transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="h-[1px] w-0 bg-goldenYellow mt-2 mx-auto transition-all duration-300 group-hover:w-16"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
