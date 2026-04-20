import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

const ProfilePage = () => {
  const { profile, updateProfile } = useShop();
  const [activeTab, setActiveTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  useEffect(() => {
    setEditForm(profile);
  }, [profile]);
  const getTabClass = (tabName) => {
    return activeTab === tabName 
      ? 'text-[#0ab7a1] font-bold cursor-pointer'
      : 'text-[#696b79] hover:font-bold hover:text-[#282c3f] cursor-pointer transition-all';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Account Overview</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <p className="text-[#696b79] text-[15px] leading-relaxed mb-6">
              Welcome back, Payal! Here is your quick overview. You can manage your orders, track returns, and update your personal details from this dashboard.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-[600px]">
              <div className="border border-[#eaeaec] p-6 rounded text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('Orders & Returns')}>
                <h3 className="font-bold text-[#282c3f] text-lg">0</h3>
                <p className="text-[#696b79] text-xs uppercase mt-1">Total Orders</p>
              </div>
              <div className="border border-[#eaeaec] p-6 rounded text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('Addresses')}>
                <h3 className="font-bold text-[#282c3f] text-lg">0</h3>
                <p className="text-[#696b79] text-xs uppercase mt-1">Saved Addresses</p>
              </div>
            </div>
          </motion.div>
        );

      case 'Orders & Returns':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Orders & Returns</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <div className="bg-[#f9f9f9] p-10 text-center rounded-sm max-w-[600px] border border-[#eaeaec]">
              <h3 className="text-[#282c3f] font-bold mb-2">No Active Orders</h3>
              <p className="text-[#696b79] text-sm mb-6">You haven't placed any orders yet. Start exploring our collections!</p>
              <button className="px-8 py-3 border border-[#ff3f6c] text-[#ff3f6c] rounded-sm font-bold text-xs uppercase transition-colors hover:bg-[#ff3f6c] hover:text-white tracking-widest">
                Start Shopping
              </button>
            </div>
          </motion.div>
        );

      case 'Coupons':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Available Coupons</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <div className="p-8 border border-dashed border-[#d4d5d9] bg-[#fafafa] text-center max-w-[600px]">
              <p className="text-[#696b79] text-sm">No active coupons available at the moment.</p>
            </div>
          </motion.div>
        );

      case 'Gauri Credit':
      case 'GauriCash':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">{activeTab} Dashboard</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#fdfbf7] to-[#fff] border border-[#eaeaec] rounded-sm max-w-[600px]">
              <div>
                <p className="text-[#696b79] text-xs uppercase tracking-widest mb-1">Available Balance</p>
                <h2 className="text-3xl font-bold text-[#d4af37]">₹ 0.00</h2>
              </div>
              <button className="px-6 py-2 bg-[#d4af37] text-white text-xs font-bold uppercase tracking-widest rounded-sm opacity-50 cursor-not-allowed">
                Redeem
              </button>
            </div>
          </motion.div>
        );

      case 'Saved Cards':
      case 'Saved UPI':
      case 'Saved Wallets/BNPL':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Payment Methods - {activeTab}</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <p className="text-[#696b79] text-[15px] mb-8">Securely save your payment details for faster checkout.</p>
            <div className="border border-[#eaeaec] p-8 text-center max-w-[600px] bg-[#f9f9f9]">
              <p className="text-[#7e818c] text-sm mb-4">No {activeTab.toLowerCase()} saved to this account.</p>
              <button className="text-[#ff3f6c] font-bold uppercase text-xs tracking-widest hover:underline">
                + Add New Method
              </button>
            </div>
          </motion.div>
        );

      case 'Addresses':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Saved Addresses</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <div className="border border-dashed border-[#d4d5d9] p-6 max-w-[600px] cursor-pointer hover:bg-[#f9f9f9] transition-colors">
              <h3 className="text-[#ff3f6c] font-bold text-sm tracking-wide uppercase">+ Add New Address</h3>
            </div>
          </motion.div>
        );

      case 'Gauri Insider':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Gauri Insider Program</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <div className="bg-[#282c3f] text-white p-8 rounded-sm max-w-[600px]">
              <h2 className="text-xl font-serif text-[#d4af37] mb-2">Be an Insider</h2>
              <p className="text-white/80 text-sm mb-6">Enjoy exclusive perks, early access to sales, and premium support.</p>
              <button className="px-6 py-3 bg-[#d4af37] text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#c5a028] transition-colors">
                Join Now for Free
              </button>
            </div>
          </motion.div>
        );

      case 'Delete Account':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#ff0000] mb-8">Delete Account</h1>
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>
            <p className="text-[#282c3f] font-bold mb-2">Are you sure you want to delete your account?</p>
            <p className="text-[#696b79] text-sm mb-8 max-w-[600px]">
              Deleting your account will permanently remove all your personal data, order history, and saved items. This action cannot be undone.
            </p>
            <button className="px-8 py-3 bg-white border border-[#ff0000] text-[#ff0000] rounded-sm font-bold text-xs uppercase transition-colors hover:bg-[#ff0000] hover:text-white tracking-widest">
              Delete My Account
            </button>
          </motion.div>
        );

      case 'Profile':
      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-14 md:pt-14 md:pl-20">
            <h1 className="text-[18px] font-bold text-[#282c3f] mb-8">Profile Details</h1>
            
            <div className="border-b border-[#eaeaec] mb-12 max-w-[600px]"></div>

            <div className="max-w-[480px] space-y-[28px] font-sans text-[15px]">
              
              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Full Name</span>
                {isEditing ? (
                  <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.fullName || '- not added -'}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Mobile Number</span>
                {isEditing ? (
                  <input type="text" value={editForm.mobile} onChange={(e) => setEditForm({...editForm, mobile: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.mobile || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Email ID</span>
                {isEditing ? (
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.email || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Gender</span>
                {isEditing ? (
                  <select value={editForm.gender} onChange={(e) => setEditForm({...editForm, gender: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c] bg-white">
                    <option value="">- Select -</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="text-[#282c3f]">{profile.gender || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Date of Birth</span>
                {isEditing ? (
                  <input type="date" value={editForm.dob} onChange={(e) => setEditForm({...editForm, dob: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.dob || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Location</span>
                {isEditing ? (
                  <input type="text" value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.location || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Alternate Mobile</span>
                {isEditing ? (
                  <input type="text" value={editForm.altMobile} onChange={(e) => setEditForm({...editForm, altMobile: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.altMobile || '- not added -'}</span>
                )}
              </div>

              <div className="flex items-center">
                <span className="w-48 text-[#282c3f]">Hint Name</span>
                {isEditing ? (
                  <input type="text" value={editForm.hintName} onChange={(e) => setEditForm({...editForm, hintName: e.target.value})} className="flex-1 border border-[#eaeaec] px-3 py-2 text-sm focus:outline-none focus:border-[#ff3f6c]" />
                ) : (
                  <span className="text-[#282c3f]">{profile.hintName || '- not added -'}</span>
                )}
              </div>

              <div className="pt-8 w-[95%] text-center space-y-4">
                {isEditing ? (
                  <>
                    <button onClick={() => { updateProfile(editForm); setIsEditing(false); }} className="w-full bg-[#ff3f6c] hover:bg-[#ff3f6c]/95 text-contentWhite font-bold py-3.5 rounded shadow-sm transition-colors uppercase text-[13px] tracking-wide mb-3">
                      Save Changes
                    </button>
                    <button onClick={() => { setIsEditing(false); setEditForm(profile); }} className="w-full bg-transparent border border-[#d4d5d9] hover:border-[#282c3f] text-[#282c3f] font-bold py-3.5 rounded shadow-sm transition-colors uppercase text-[13px] tracking-wide">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="w-full bg-[#ff3f6c] hover:bg-[#ff3f6c]/95 text-contentWhite font-bold py-3.5 rounded shadow-sm transition-colors uppercase text-[13px] tracking-wide">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f5]">
      {/* Spacer for Fixed Header */}
      <div className="h-[120px]"></div>

      <div className="container mx-auto px-4 lg:px-8 py-8 mb-12">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <div className="w-full md:w-[260px] flex-shrink-0 md:pr-6 border-r border-[#eaeaec] bg-contentWhite p-6 md:bg-transparent md:p-0 md:border-transparent">
            {/* Account Info */}
            <div className="mb-4">
              <h2 className="text-[17px] font-bold text-[#282c3f]">Account</h2>
              <p className="text-[14px] text-[#282c3f] mt-1">Payal</p>
            </div>
            
            <div className="border-t border-[#eaeaec] bg-transparent my-4"></div>
            
            <nav className="text-[14.5px] font-sans">
              <div 
                className={`py-2 ${getTabClass('Overview')}`}
                onClick={() => setActiveTab('Overview')}
              >
                Overview
              </div>
              
              <div className="border-t border-[#eaeaec] my-4"></div>
              
              <div className="text-[11px] font-bold text-[#7e818c] mb-4 tracking-widest uppercase">ORDERS</div>
              <ul className="space-y-[14px] mb-6">
                <li className={getTabClass('Orders & Returns')} onClick={() => setActiveTab('Orders & Returns')}>Orders & Returns</li>
              </ul>
              
              <div className="border-t border-[#eaeaec] my-4"></div>
              
              <div className="text-[11px] font-bold text-[#7e818c] mb-4 tracking-widest uppercase">CREDITS</div>
              <ul className="space-y-[14px] mb-6">
                <li className={getTabClass('Coupons')} onClick={() => setActiveTab('Coupons')}>Coupons</li>
                <li className={getTabClass('Gauri Credit')} onClick={() => setActiveTab('Gauri Credit')}>Gauri Credit</li>
                <li className={getTabClass('GauriCash')} onClick={() => setActiveTab('GauriCash')}>GauriCash</li>
              </ul>
              
              <div className="border-t border-[#eaeaec] my-4"></div>
              
              <div className="text-[11px] font-bold text-[#7e818c] mb-4 tracking-widest uppercase">ACCOUNT</div>
              <ul className="space-y-[14px]">
                <li className={getTabClass('Profile')} onClick={() => setActiveTab('Profile')}>Profile</li>
                <li className={getTabClass('Saved Cards')} onClick={() => setActiveTab('Saved Cards')}>Saved Cards</li>
                <li className={getTabClass('Saved UPI')} onClick={() => setActiveTab('Saved UPI')}>Saved UPI</li>
                <li className={getTabClass('Saved Wallets/BNPL')} onClick={() => setActiveTab('Saved Wallets/BNPL')}>Saved Wallets/BNPL</li>
                <li className={getTabClass('Addresses')} onClick={() => setActiveTab('Addresses')}>Addresses</li>
                <li className={getTabClass('Gauri Insider')} onClick={() => setActiveTab('Gauri Insider')}>Gauri Insider</li>
                <li className={getTabClass('Delete Account')} onClick={() => setActiveTab('Delete Account')}>Delete Account</li>
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-contentWhite md:ml-8 border border-[#eaeaec] min-h-[700px]">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
