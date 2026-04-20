import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Star, X, MapPin, Phone, Mail } from 'lucide-react';
import AdminLayout from './AdminLayout';

import { useShop } from '../../context/ShopContext';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.includes(searchTerm) || o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export!");
      return;
    }

    // Define CSV Headers
    const headers = ['Order ID', 'Customer Name', 'Date & Time', 'Total Amount (₹)', 'Status'];
    
    // Construct rows
    const rows = filteredOrders.map(order => [
      `GAURI-${order.id}`,
      order.customer,
      order.date.replace(',', ''), // Replace commas to avoid CSV shifting
      order.amount,
      order.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'gauri_collection_orders.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-softBrown">Order Management</h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Processing beauty to your doorstep</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 border border-softBrown/20 text-softBrown px-6 py-3 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-beige transition-all duration-300"
        >
          <Download size={20} /> Export Orders
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by order ID, customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-goldenYellow outline-none"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-softBrown" size={16} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-6 py-3 bg-gray-50 text-softBrown rounded-xl text-xs font-bold uppercase tracking-widest outline-none hover:bg-beige transition-colors appearance-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 italic">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Details</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-5">
                  <div>
                    <h4 className="text-sm font-bold text-softBrown">#GAURI-{order.id}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{order.date}</p>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-softBrown/10 flex items-center justify-center text-softBrown font-bold text-[10px]">P</div>
                    <span className="text-sm font-medium text-softBrown">{order.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <p className="text-sm font-bold text-goldenYellow italic">₹{order.amount.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-4 py-5">
                  <span className={`text-[9px] px-3 py-1 rounded-full uppercase tracking-[0.2em] font-bold 
                    ${order.status === 'Pending' ? 'bg-blue-100 text-blue-600' : ''}
                    ${order.status === 'Processing' ? 'bg-orange-100 text-orange-600' : ''}
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : ''}
                    ${order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : ''}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-softBrown/40 hover:text-goldenYellow transition-colors"
                  >
                    <Eye size={20} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400 font-serif">No orders found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="text-xl font-serif text-softBrown">Order #GAURI-{selectedOrder.id}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 md:p-8 space-y-8 h-[60vh] overflow-y-auto">
              
              {/* Customer Info Card */}
              <div className="bg-beige/30 rounded-2xl p-5 border border-softBrown/5 flex items-start gap-5">
                <div className="w-12 h-12 bg-softBrown text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {selectedOrder.customer.charAt(0)}
                </div>
                <div className="space-y-2 w-full">
                  <h4 className="text-sm font-bold text-softBrown">{selectedOrder.customer}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <p className="text-xs text-gray-500 flex items-center gap-2"><Phone size={12} className="text-goldenYellow" /> +91 93403 91897</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2"><Mail size={12} className="text-goldenYellow" /> customer@example.com</p>
                    <p className="text-xs text-gray-500 flex items-start gap-2 sm:col-span-2 mt-1">
                      <MapPin size={12} className="text-goldenYellow flex-shrink-0 mt-0.5" /> 
                      12, DB Mall Road, Arera Colony, Bhopal, Madhya Pradesh 462011
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Purchased Items</h4>
                <div className="space-y-4">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image || "/crouser1.png"} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-softBrown">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Qty: {item.qty || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-softBrown italic">₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                  {(!selectedOrder.items || selectedOrder.items.length === 0) && (
                    <p className="text-xs text-gray-400 italic">No item details available.</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-medium">Subtotal</span>
                  <span className="text-sm font-bold text-softBrown italic">₹{selectedOrder.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-medium">Shipping (Express)</span>
                  <span className="text-sm font-bold text-softBrown italic">Free</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-bold text-softBrown uppercase tracking-widest">Total Paid</span>
                  <span className="text-lg font-bold text-goldenYellow italic">₹{selectedOrder.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className={`text-[10px] px-3 py-1.5 rounded-full uppercase tracking-[0.2em] font-bold
                ${selectedOrder.status === 'Pending' ? 'bg-blue-100 text-blue-600' : ''}
                ${selectedOrder.status === 'Processing' ? 'bg-orange-100 text-orange-600' : ''}
                ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' : ''}
                ${selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-600' : ''}
              `}>
                Status: {selectedOrder.status}
              </span>
              
              <div className="flex gap-3">
                {selectedOrder.status === 'Pending' ? (
                  <>
                    <button 
                      onClick={() => { updateOrderStatus(selectedOrder.id, 'Cancelled'); setSelectedOrder({...selectedOrder, status:'Cancelled'}); }} 
                      className="border border-red-200 text-red-500 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => { updateOrderStatus(selectedOrder.id, 'Processing'); setSelectedOrder({...selectedOrder, status:'Processing'}); }} 
                      className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-700 shadow-lg transition-colors"
                    >
                      Accept Order
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setSelectedOrder(null)} 
                    className="bg-softBrown text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-goldenYellow transition-colors"
                  >
                    Close Pane
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminOrders;
