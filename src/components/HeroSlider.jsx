import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { id: 1, imageUrl: '/slider1.png', alt: 'Premium Collection 1' },
  { id: 2, imageUrl: '/slider2.png', alt: 'Premium Collection 2' },
  { id: 3, imageUrl: '/slider3.png', alt: 'Premium Collection 3' },
  { id: 4, imageUrl: '/slider4.png', alt: 'Premium Collection 4' },
];

const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
    };
  }
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we wrap around using modulo
  const currentIndex = Math.abs(page % slides.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Automatic slide changing every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [page]);

  const goToDot = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    if (index !== currentIndex) {
      setPage([index, newDirection]);
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] lg:h-[90vh] overflow-hidden group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: "easeInOut", duration: 1.2 },
            opacity: { duration: 0.6 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={slides[currentIndex].imageUrl}
            alt={slides[currentIndex].alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Always visible, brighter on hover) */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-contentWhite/50 backdrop-blur-sm text-softBrown opacity-60 group-hover:opacity-100 transition-opacity duration-300 hover:bg-contentWhite/80 focus:outline-none z-20 cursor-pointer shadow-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} strokeWidth={1.5} />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-contentWhite/50 backdrop-blur-sm text-softBrown opacity-60 group-hover:opacity-100 transition-opacity duration-300 hover:bg-contentWhite/80 focus:outline-none z-20 cursor-pointer shadow-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={36} strokeWidth={1.5} />
      </button>

      {/* Minimalist Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToDot(dotIndex)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              currentIndex === dotIndex
                ? "bg-softBrown w-8"
                : "bg-softBrown/40 w-2.5 hover:bg-softBrown/70"
            }`}
            aria-label={`Go to slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
