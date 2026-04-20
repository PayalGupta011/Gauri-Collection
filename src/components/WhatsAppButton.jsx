import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-contentWhite p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 bg-contentWhite text-softBrown px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-widest uppercase shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-softBrown/5">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
