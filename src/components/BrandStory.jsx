import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-24 bg-softBrown text-contentWhite overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-goldenYellow font-sans text-xs tracking-[0.4em] font-semibold uppercase block mb-6">
                Our Heritage
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-contentWhite mb-8 leading-tight">
                Crafting Elegance <br /> Since 1995
              </h2>
              <div className="space-y-6 text-contentWhite/70 font-sans leading-relaxed text-lg text-justify md:text-left">
                <p>
                  At Gauri Collection, we believe that every garment tells a story. Our journey began with a simple vision: to bring the timeless elegance of Indian heritage to the modern woman.
                </p>
                <p>
                  Each piece in our collection is meticulously handcrafted by master artisans who have preserved their craft through generations. We use only the finest silk, handloom fabrics, and intricate zari work to ensure every stitch reflects luxury.
                </p>
              </div>
              
              <div className="mt-12 flex items-center justify-between md:justify-start md:gap-16 border-t border-contentWhite/10 pt-12">
                <div className="text-center md:text-left">
                  <span className="block text-4xl font-serif text-goldenYellow">25+</span>
                  <span className="text-[10px] tracking-widest uppercase text-contentWhite/50 font-medium">Years Experience</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-4xl font-serif text-goldenYellow">10k+</span>
                  <span className="text-[10px] tracking-widest uppercase text-contentWhite/50 font-medium">Happy Clients</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-4xl font-serif text-goldenYellow">100%</span>
                  <span className="text-[10px] tracking-widest uppercase text-contentWhite/50 font-medium">Handcrafted</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-goldenYellow/20 translate-x-4 translate-y-4 -z-10"></div>
              
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <img 
                  src="/brand-bg.png" 
                  alt="Gauri Collection Craftsmanship" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-contentWhite p-8 shadow-xl hidden md:block"
              >
                <p className="text-softBrown font-serif text-xl italic italic">
                  "Tradition meets <br /> contemporary soul."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
