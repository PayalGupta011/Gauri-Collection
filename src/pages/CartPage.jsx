import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CartPage = () => {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment / processing API
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-beige">
      <div className="h-[118px]"></div>

      <div className="bg-softBrown py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-contentWhite">Your Cart</h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <ShoppingBag size={64} className="mx-auto text-softBrown/30 mb-8" />
            <p className="text-2xl font-serif text-softBrown mb-4">Your cart is empty</p>
            <p className="text-softBrown/60 mb-10">Discover our premium collections and add something beautiful.</p>
            <button onClick={() => navigate('/category/all')} className="px-10 py-4 bg-softBrown text-contentWhite font-sans text-xs tracking-[0.3em] uppercase hover:bg-goldenYellow transition-colors duration-300">
              Shop Now
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-6 bg-contentWhite p-6 shadow-sm"
                >
                  <img src={item.image} alt={item.name} className="w-28 h-36 object-cover flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)} />
                  <div className="flex-1">
                    <h3 className="text-lg font-serif text-softBrown">{item.name}</h3>
                    <p className="text-goldenYellow font-semibold mt-1 tracking-wide">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 border border-softBrown/20 flex items-center justify-center hover:border-goldenYellow transition-colors"><Minus size={14} /></button>
                      <span className="font-serif text-softBrown w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 border border-softBrown/20 flex items-center justify-center hover:border-goldenYellow transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <button onClick={() => removeFromCart(item.id)} className="text-softBrown/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    <p className="font-serif text-softBrown text-lg">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-contentWhite p-8 shadow-sm h-fit">
              <h2 className="text-2xl font-serif text-softBrown mb-8 pb-6 border-b border-softBrown/10">Order Summary</h2>
              <div className="space-y-4 text-softBrown font-sans text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-green-700">{cartTotal >= 2999 ? 'Free' : '₹199'}</span></div>
                {cartTotal < 2999 && <p className="text-xs text-goldenYellow">Add ₹{(2999 - cartTotal).toLocaleString('en-IN')} more for free shipping!</p>}
                <div className="flex justify-between font-serif text-softBrown text-lg border-t border-softBrown/10 pt-4 mt-4">
                  <span>Total</span>
                  <span>₹{(cartTotal + (cartTotal >= 2999 ? 0 : 199)).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full mt-8 py-5 font-sans text-xs tracking-[0.3em] uppercase transition-all duration-500 flex justify-center items-center shadow-lg transform hover:-translate-y-1 btn-premium gold-shimmer text-contentWhite"
              >
                BUY NOW
              </button>
              <button onClick={() => navigate('/category/all')} className="w-full mt-4 border border-softBrown/30 text-softBrown py-3 font-sans text-xs tracking-[0.3em] uppercase hover:border-goldenYellow transition-colors duration-300">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-contentWhite p-10 max-w-md w-full text-center shadow-2xl relative"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-serif text-softBrown mb-4">Order Placed Successfully!</h2>
            <p className="text-softBrown/70 font-sans text-sm mb-8 leading-relaxed">
              Thank you for shopping with Gauri Collection. Your order has been received and is currently being processed.
            </p>
            <button 
              onClick={() => {
                setOrderPlaced(false);
                navigate('/profile');
              }}
              className="w-full bg-softBrown text-contentWhite py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-goldenYellow transition-colors"
            >
              View Order in Profile
            </button>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CartPage;
