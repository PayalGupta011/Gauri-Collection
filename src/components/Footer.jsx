import React from 'react';
import { Share2, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-softBrown text-contentWhite pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-contentWhite/10">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif tracking-widest leading-none">
              GAURI <br /> <span className="text-goldenYellow">COLLECTION</span>
            </h2>
            <p className="text-contentWhite/60 font-sans text-sm leading-relaxed max-w-xs">
              Bringing you the finest selection of premium ethnic wear, handlooms, and luxury textiles since 1995. Elegance in every thread.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-contentWhite/20 flex items-center justify-center hover:bg-goldenYellow hover:border-goldenYellow transition-all duration-300">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-contentWhite/20 flex items-center justify-center hover:bg-goldenYellow hover:border-goldenYellow transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-contentWhite/20 flex items-center justify-center hover:bg-goldenYellow hover:border-goldenYellow transition-all duration-300">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-goldenYellow font-sans text-xs tracking-[0.3em] font-semibold uppercase">Quick Links</h3>
            <ul className="space-y-4 font-sans text-sm text-contentWhite/70">
              <li><a href="#" className="hover:text-goldenYellow transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-goldenYellow transition-colors">Fancy Gowns</a></li>
              <li><a href="#" className="hover:text-goldenYellow transition-colors">Saree & Lehenga</a></li>
              <li><a href="#" className="hover:text-goldenYellow transition-colors">Handloom Heritage</a></li>
              <li><a href="#" className="hover:text-goldenYellow transition-colors">About Our Story</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-goldenYellow font-sans text-xs tracking-[0.3em] font-semibold uppercase">Store Location</h3>
            <ul className="space-y-4 font-sans text-sm text-contentWhite/70">
              <li className="flex gap-4">
                <MapPin size={18} className="text-goldenYellow shrink-0" />
                <span>123 Heritage Lane, Textile Market, <br /> Surat, Gujarat - 395003</span>
              </li>
              <li className="flex gap-4">
                <Phone size={18} className="text-goldenYellow shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-4">
                <Mail size={18} className="text-goldenYellow shrink-0" />
                <span>contact@gauricollection.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-goldenYellow font-sans text-xs tracking-[0.3em] font-semibold uppercase">Newsletter</h3>
            <p className="text-contentWhite/60 text-sm">Join our list for exclusive previews and festive offers.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-contentWhite/5 border-b border-contentWhite/20 py-3 text-xs tracking-widest focus:outline-none focus:border-goldenYellow transition-colors uppercase outline-none"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-goldenYellow text-xs font-semibold tracking-widest hover:text-contentWhite transition-colors">
                SIGN UP
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-contentWhite/40 font-medium">
          <p>© 2026 GAURI COLLECTION. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-contentWhite transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-contentWhite transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-contentWhite transition-colors">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
