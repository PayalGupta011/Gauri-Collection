import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, profile, addOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');

  const shipping = cartTotal >= 2999 ? 0 : 199;
  const total = cartTotal + shipping;

  const handlePlaceOrder = () => {
    setStep(3);
    const orderId = Math.floor(10000 + Math.random() * 90000).toString();
    setCurrentOrderId(orderId);
    
    // Construct Order Object
    const newOrder = {
      id: orderId,
      customer: profile.fullName || 'Guest User',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount: total,
      status: 'Pending',
      items: cart,
      shipping: shipping
    };

    setTimeout(() => {
      addOrder(newOrder); // Save to context!
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-softBrown mb-6">Your bag is empty</h2>
          <button 
            onClick={() => navigate('/')}
            className="gold-shimmer btn-premium px-10 py-4 text-white text-xs tracking-widest uppercase font-bold"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige font-poppins">
      <div className="h-[118px]"></div>
      
      <div className="container mx-auto px-4 md:px-8 py-16">
        {!orderPlaced ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Steps */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Address */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-softBrown/5"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-softBrown text-white' : 'bg-beige text-softBrown/40'}`}>1</div>
                  <h2 className="text-xl font-serif text-softBrown">Shipping Address</h2>
                  {step > 1 && <CheckCircle2 size={18} className="text-green-500 ml-auto" />}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-softBrown/60 font-bold">Full Name</label>
                    <input type="text" defaultValue={profile.fullName} className="bg-beige/30 border border-softBrown/10 p-3 rounded-lg focus:outline-none focus:border-goldenYellow text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-softBrown/60 font-bold">Phone Number</label>
                    <input type="text" defaultValue={profile.mobile} className="bg-beige/30 border border-softBrown/10 p-3 rounded-lg focus:outline-none focus:border-goldenYellow text-sm" />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-softBrown/60 font-bold">Delivery Address</label>
                    <textarea rows="3" placeholder="Street name, landmark, apartment..." className="bg-beige/30 border border-softBrown/10 p-3 rounded-lg focus:outline-none focus:border-goldenYellow text-sm resize-none"></textarea>
                  </div>
                </div>
                
                {step === 1 && (
                  <button 
                    onClick={() => setStep(2)}
                    className="mt-8 gold-shimmer btn-premium px-8 py-3 text-white text-xs tracking-widest uppercase font-bold"
                  >
                    Continue to Payment
                  </button>
                )}
              </motion.div>

              {/* Step 2: Payment */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white p-8 rounded-2xl shadow-sm border border-softBrown/5 transition-opacity ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-softBrown text-white' : 'bg-beige text-softBrown/40'}`}>2</div>
                  <h2 className="text-xl font-serif text-softBrown">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {['UPI (PhonePe/Google Pay)', 'Credit / Debit Card', 'Cash on Delivery'].map((method, i) => (
                    <label key={i} className="flex items-center gap-4 p-4 border border-softBrown/10 rounded-xl cursor-pointer hover:bg-beige/30 transition-colors">
                      <input type="radio" name="payment" defaultChecked={i === 0} className="accent-goldenYellow" />
                      <span className="text-sm border-softBrown font-medium">{method}</span>
                      <CreditCard size={18} className="ml-auto text-softBrown/40" />
                    </label>
                  ))}
                </div>

                {step === 2 && (
                  <div className="mt-10 flex flex-col gap-4">
                    <button 
                      onClick={handlePlaceOrder}
                      className="gold-shimmer btn-premium py-5 text-white text-xs tracking-[0.3em] uppercase font-bold shadow-xl"
                    >
                      Complete Purchase • ₹{total.toLocaleString('en-IN')}
                    </button>
                    <button onClick={() => setStep(1)} className="text-xs text-softBrown/40 text-center hover:text-softBrown transition-colors font-bold uppercase tracking-widest">
                      Go back to address
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Summary Card */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-softBrown/5 sticky top-[140px]">
                <h3 className="text-lg font-serif text-softBrown mb-6 pb-4 border-b border-softBrown/5">Order Summary</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-softBrown line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] text-softBrown/40 mt-1">Qty: {item.qty}</p>
                        <p className="text-sm font-bold text-goldenYellow mt-1">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-softBrown/5 space-y-3">
                  <div className="flex justify-between text-xs font-medium text-softBrown/60">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-softBrown/60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif text-softBrown pt-4 border-t border-softBrown/5">
                    <span>Total Amount</span>
                    <span className="text-goldenYellow font-bold italic font-sans">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-xl flex items-center gap-3">
                  <Truck size={18} className="text-green-600" />
                  <p className="text-[10px] text-green-700 font-bold leading-tight">
                    ESTIMATED DELIVERY BY<br />24 APR - 26 APR
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-2xl text-center"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-serif text-softBrown mb-4 tracking-tight">Order Placed!</h2>
            <p className="text-softBrown/60 mb-10 leading-relaxed font-medium">
              Thank you for trusting Gauri Collection. Your order has been placed successfully and will be delivered within 3-5 business days. 
              A confirmation email has been sent to you.
            </p>
            <div className="bg-beige/30 p-6 rounded-2xl mb-10 text-left border border-softBrown/5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-softBrown/40 font-bold">Order ID:</span>
                <span className="text-softBrown font-bold">#GAURI-{currentOrderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-softBrown/40 font-bold">Estimated Arrival:</span>
                <span className="text-softBrown font-bold">25th April, 2026</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/profile')}
                className="flex-1 bg-softBrown text-white py-4 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-softBrown/90 transition-colors"
              >
                Track My Order
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 border border-softBrown/20 text-softBrown py-4 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-beige transition-colors"
              >
                Back to Shop
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
