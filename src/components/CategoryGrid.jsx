import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, title: 'BEDSHEET', image: 'https://m.media-amazon.com/images/I/61VBCTfAp6L._SY300_SX300_QL70_FMwebp_.jpg', path: '/category/bedding' },
  { id: 2, title: 'SAREE', image: 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/196e9d9AARYAN18304KR_1.jpg?rnd=20200526195200&tr=w-256', path: '/category/saree-lehenga' },
  { id: 3, title: 'FANCY GOWN', image: 'https://media.samyakk.in/pub/media/catalog/product/b/l/blue-sequins-embroidered-net-ball-gown-with-pentagon-neck-jh3068_1.jpg', path: '/category/fancy-gowns' },
  { id: 4, title: 'LEHENGA', image: 'https://5.imimg.com/data5/ECOM/Default/2024/4/406953461/JV/JD/TB/153990963/img-20240403-173334-1000x1000.jpg', path: '/category/saree-lehenga' },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-contentWhite overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Section with Button on Right */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-softBrown tracking-tight"
            >
              Shop By Category
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 bg-goldenYellow mt-4 mx-auto md:mx-0"
            ></motion.div>
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => navigate('/category/all')}
            className="text-softBrown border-b border-softBrown/40 pb-1 text-sm font-medium tracking-[0.2em] hover:text-goldenYellow hover:border-goldenYellow transition-all duration-300 uppercase"
          >
            Explore All Categories
          </motion.button>
        </div>

        {/* Categories - 4 Arched Cards Only */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-14">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => navigate(cat.path)}
              className="group cursor-pointer flex flex-col items-center w-[200px] md:w-[220px]"
            >
              {/* Arched Window Shape */}
              <div className="relative w-full aspect-[4/6] rounded-t-full overflow-hidden border border-softBrown/10 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover origin-center group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                />
                <div className="absolute inset-0 bg-softBrown/0 group-hover:bg-softBrown/10 transition-colors duration-500" />
              </div>

              {/* Category Text */}
              <div className="mt-6 text-center">
                <h3 className="text-sm md:text-base font-sans text-softBrown tracking-[0.2em] group-hover:text-goldenYellow transition-colors duration-300 font-medium">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
