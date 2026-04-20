import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "FANCY GOWNS", path: "/category/fancy-gowns" },
  { label: "SAREE & LEHENGA", path: "/category/saree-lehenga" },
  { label: "HANDLOOM", path: "/category/handloom" },
  { label: "BEDDING", path: "/category/bedding" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
];

const Header = () => {
  const { products, cartCount, wishlist } = useShop();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Persist search history
  const [searchHistory, setSearchHistory] = useState(() => {
    const localHistory = localStorage.getItem('gauri_search_history');
    return localHistory ? JSON.parse(localHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('gauri_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (term) => {
    if (!term.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 5); // Keep top 5
    });
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addToHistory(searchQuery.trim());
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col bg-[#EBE4D8]/95 backdrop-blur-md border-b border-softBrown/20 shadow-sm">
      {/* Tier 1: Top Bar */}
      <div className="flex justify-between items-center px-4 md:px-8 py-2 h-16 relative">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link to="/">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full border border-softBrown/40 p-[2px] bg-contentWhite shadow-[0_0_8px_rgba(139,111,71,0.15)] cursor-pointer"
            />
          </Link>
        </div>

        {/* Center: Shop Name */}
        <div className="flex-[2] flex justify-center text-center">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-serif text-softBrown tracking-wide cursor-pointer hover:text-goldenYellow transition-colors duration-300">
              GAURI COLLECTION
            </h1>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-5 text-softBrown tracking-wide">
          <button onClick={() => { setIsSearchOpen(!isSearchOpen); setSearchQuery(''); }} className="hover:text-goldenYellow transition-colors duration-300">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => navigate('/wishlist')} className="relative hover:text-goldenYellow transition-colors duration-300">
            <Heart size={20} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1 bg-goldenYellow text-contentWhite text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/cart')} className="relative hover:text-goldenYellow transition-colors duration-300 pr-1">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1 bg-goldenYellow text-contentWhite text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => navigate('/profile')} className="hover:text-goldenYellow transition-colors duration-300">
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Search Overlay/Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-contentWhite/95 backdrop-blur-md border-b border-[#eaeaec] shadow-md z-40 px-4 py-4 md:px-8 flex flex-col items-center"
          >
            <div className="w-full max-w-2xl relative flex items-center">
              <Search className="absolute left-3 text-softBrown/50" size={18} />
              <input
                type="text"
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Sarees, Gowns, Bedsheets..."
                className="w-full border border-softBrown/30 py-2 pl-10 pr-10 rounded focus:outline-none focus:border-softBrown text-sm font-sans bg-transparent placeholder:text-softBrown/50 text-softBrown"
                autoFocus
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }} 
                className="absolute right-3 text-softBrown/50 hover:text-softBrown transition-colors"
                aria-label="Close Search"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Search History & Results Wrapper */}
            <div className="w-full max-w-2xl mt-3">
              {/* Show History if search query is empty and history exists */}
              {searchQuery.trim().length === 0 && searchHistory.length > 0 && (
                <div className="bg-contentWhite border border-[#eaeaec] shadow-sm rounded p-4 custom-scrollbar">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-softBrown/60">Recent Searches</h3>
                    <button 
                      onClick={() => setSearchHistory([])} 
                      className="text-[10px] uppercase tracking-widest text-[#ff3f6c] hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((item, idx) => (
                      <span 
                        key={idx} 
                        onClick={() => setSearchQuery(item)}
                        className="px-3 py-1.5 bg-beige text-softBrown text-xs rounded-full cursor-pointer hover:bg-softBrown hover:text-contentWhite transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchQuery.trim().length > 0 && (
                <div className="max-h-64 overflow-y-auto bg-contentWhite border border-[#eaeaec] shadow-sm rounded custom-scrollbar">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div 
                        key={product.id} 
                        onClick={() => {
                          addToHistory(product.name);
                          navigate(`/product/${product.id}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-4 p-3 border-b last:border-0 border-[#eaeaec] hover:bg-beige/60 cursor-pointer transition-colors"
                      >
                        <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded shadow-sm" />
                        <div>
                          <h4 className="font-bold text-softBrown text-sm tracking-wide">{product.name}</h4>
                          <p className="text-softBrown/70 text-xs font-sans tracking-widest mt-1">₹{product.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-softBrown/70 text-sm font-sans tracking-widest uppercase">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tier 2: Navigation Bar */}
      <nav className="flex justify-center items-center pb-2 pt-0.5">
        <ul className="flex flex-wrap justify-center gap-5 md:gap-7 text-softBrown font-sans text-[10px] md:text-xs tracking-widest font-medium">
          {navLinks.map((link) => (
            <li key={link.path} className="relative group cursor-pointer py-1">
              <Link
                to={link.path}
                className="hover:text-goldenYellow transition-colors duration-300"
              >
                {link.label}
              </Link>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-goldenYellow transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 transform -translate-x-1/2 group-hover:translate-x-0"></span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tier 3: The Marquee */}
      <div className="w-full bg-softBrown text-contentWhite overflow-hidden py-1.5 select-none flex border-t border-softBrown/20">
        <motion.div
          className="flex whitespace-nowrap text-[10px] md:text-[11px] tracking-widest uppercase items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-8 px-4 items-center">
              <span>✨ NEW FESTIVE COLLECTION LIVE!</span>
              <span>|</span>
              <span>FREE SHIPPING ON ORDERS ABOVE ₹2999 ✨</span>
              <span>|</span>
              <span>PREMIUM HANDLOOM NOW AVAILABLE!</span>
              <span>|</span>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
