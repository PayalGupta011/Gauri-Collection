import React, { useState } from 'react';
import { Save, Bell, Shield, Store, CreditCard } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('store');

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-softBrown">Settings</h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Configure your Gauri Collection portal</p>
        </div>
        <button className="flex items-center gap-2 bg-softBrown text-white px-6 py-3 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-goldenYellow transition-all duration-300 shadow-lg">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden flex flex-row lg:flex-col gap-1 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'store' ? 'bg-beige/40 text-softBrown' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Store size={18} /> Store Details
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'payment' ? 'bg-beige/40 text-softBrown' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <CreditCard size={18} /> Payments
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'notifications' ? 'bg-beige/40 text-softBrown' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'security' ? 'bg-beige/40 text-softBrown' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Shield size={18} /> Security
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {activeTab === 'store' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-softBrown border-b border-gray-100 pb-4 mb-6">Store Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Store Name</label>
                  <input type="text" defaultValue="Gauri Collection" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                  <input type="email" defaultValue="admin@gauricollection.com" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Store Address</label>
                  <textarea rows="3" defaultValue="124, Fashion Street, DB Mall, Bhopal, MP" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-softBrown border-b border-gray-100 pb-4 mb-6">Payment Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div>
                    <h4 className="font-bold text-softBrown text-sm">UPI Payments (PhonePe/GPay)</h4>
                    <p className="text-xs text-gray-500 mt-1">Accept direct UPI transfers</p>
                  </div>
                  <div className="w-12 h-6 bg-goldenYellow rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div>
                    <h4 className="font-bold text-softBrown text-sm">Cash on Delivery (COD)</h4>
                    <p className="text-xs text-gray-500 mt-1">Allow customers to pay upon delivery</p>
                  </div>
                  <div className="w-12 h-6 bg-goldenYellow rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'notifications' || activeTab === 'security') && (
            <div className="text-center py-20 text-gray-400 font-serif">
              Component "{activeTab}" is currently under development.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
