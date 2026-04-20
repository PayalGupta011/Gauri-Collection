import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const instaImages = [
  '/hero1.png',
  '/hero2.png',
  '/hero3.png',
  '/crouser1.png',
  '/crouser2.png',
  '/crouser3.png',
];

const InstagramFeed = () => {
  return (
    <section className="py-24 bg-contentWhite">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-beige rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:rotate-12"
          >
            <Camera size={20} className="text-softBrown" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif text-softBrown">Follow Our Journey</h2>
          <p className="mt-4 text-goldenYellow font-sans text-xs tracking-[0.4em] uppercase font-medium">@GauriCollection</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instaImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Instagram ${index}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-softBrown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera size={24} className="text-contentWhite" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
