import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-beige">
      <div className="h-[118px]"></div>
      
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/brand-bg.png" alt="About Gauri" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-softBrown/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-goldenYellow font-sans text-xs tracking-[0.5em] font-medium uppercase mb-4 block"
          >
            Since 1995
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-contentWhite mb-6"
          >
            Our Legacy
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center">
            <h2 className="text-3xl font-serif text-softBrown mb-8 italic">"Every thread woven with tradition, every stitch made for you."</h2>
            <p className="text-lg text-softBrown/80 leading-loose font-sans">
              Founded in the heart of our culture, Gauri Collection has grown from a small family-run boutique to a global destination for premium ethnic wear. Our secret lies in the artisans who bring their childhood memories of patterns and colors to every piece of clothing we sell.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded-t-full overflow-hidden shadow-2xl">
              <img src="/saree.png" alt="Traditional Saree" className="w-full aspect-[3/4] object-cover" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-softBrown">Heritage Craftsmanship</h3>
              <p className="text-softBrown/70 leading-relaxed font-sans">
                We travel to the remotest parts of India—from the handloom clusters of Banaras to the embroidery hubs of Surat—to find the most authentic fabrics. We don't just sell clothes; we preserve art forms that have existed for centuries.
              </p>
              <ul className="space-y-4 font-sans text-sm text-softBrown font-medium uppercase tracking-widest">
                <li className="flex gap-4">💎 Quality First Approach</li>
                <li className="flex gap-4">🧵 Handloomed with Care</li>
                <li className="flex gap-4">👑 Royal Aesthetic Designs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
