import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders above ₹2999'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: '100% secure payment processing'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: '7-day hassle-free return policy'
  },
  {
    icon: Award,
    title: 'Authentic Quality',
    desc: 'Direct from master artisans'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-beige/30 border-y border-softBrown/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-contentWhite flex items-center justify-center text-goldenYellow shadow-sm group-hover:bg-goldenYellow group-hover:text-contentWhite transition-all duration-500 mb-4">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-softBrown text-sm tracking-widest uppercase mb-1">
                {item.title}
              </h3>
              <p className="font-sans text-[10px] text-softBrown/60 tracking-wider uppercase">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
