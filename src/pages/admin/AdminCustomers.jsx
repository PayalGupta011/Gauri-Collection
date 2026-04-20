import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MoreVertical, ShieldCheck } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock Customers Data
  const customers = [
    { id: 1, name: 'Payal Kushwah', email: 'payal@example.com', phone: '+91 93403 91897', totalOrders: 5, spent: '₹42,500', status: 'Active' },
    { id: 2, name: 'Aarohi Singh', email: 'aarohi@example.com', phone: '+91 98765 43210', totalOrders: 2, spent: '₹14,999', status: 'Active' },
    { id: 3, name: 'Neha Sharma', email: 'neha.sh@example.com', phone: '+91 91234 56789', totalOrders: 8, spent: '₹1,02,400', status: 'VIP' },
    { id: 4, name: 'Kritika Patel', email: 'kritika@example.com', phone: '+91 78901 23456', totalOrders: 1, spent: '₹5,799', status: 'Inactive' },
    { id: 5, name: 'Sneha Gupta', email: 'sneha.g@example.com', phone: '+91 89012 34567', totalOrders: 3, spent: '₹22,500', status: 'Active' },
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-softBrown">Customer Management</h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">View and manage your client base</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-goldenYellow outline-none"
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
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 italic">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Focus</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Spent</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-softBrown/10 rounded-full flex items-center justify-center text-softBrown font-bold flex-shrink-0">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-softBrown flex items-center gap-2">
                        {customer.name}
                        {customer.status === 'VIP' && <ShieldCheck size={14} className="text-goldenYellow" />}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">Customer ID: {2300 + customer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-2"><Mail size={12} /> {customer.email}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2"><Phone size={12} /> {customer.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span className="text-sm font-bold text-softBrown">{customer.totalOrders}</span>
                </td>
                <td className="px-4 py-5">
                  <p className="text-sm font-bold text-goldenYellow italic font-sans">{customer.spent}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-softBrown/40 hover:text-softBrown transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
