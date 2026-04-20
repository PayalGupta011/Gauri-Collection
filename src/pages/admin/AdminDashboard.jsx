import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useShop } from '../../context/ShopContext';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-beige/50 rounded-xl text-softBrown">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-serif text-softBrown mt-1">{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const { orders } = useShop();
  
  return (
    <AdminLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-serif text-softBrown">Dashboard Overview</h2>
        <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Tracking Gauri Collection growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Revenue" value="₹42,85,299" icon={DollarSign} trend="up" trendValue="12.5%" />
        <StatCard title="Total Orders" value="1,248" icon={ShoppingBag} trend="up" trendValue="8.2%" />
        <StatCard title="New Customers" value="482" icon={Users} trend="down" trendValue="3.1%" />
        <StatCard title="Conversion Rate" value="3.42%" icon={TrendingUp} trend="up" trendValue="0.8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Mock */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif text-softBrown">Recent Orders</h3>
            <button className="text-xs font-bold text-goldenYellow hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-6">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs
                    ${order.status === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-beige text-softBrown'}`}
                  >
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-softBrown">{order.customer.split(' ')[0]} #{order.id}</h4>
                    <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-softBrown">₹{order.amount.toLocaleString('en-IN')}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mt-1
                    ${order.status === 'Pending' ? 'text-blue-500' : ''}
                    ${order.status === 'Processing' ? 'text-orange-500' : ''}
                    ${order.status === 'Delivered' ? 'text-green-500' : ''}
                    ${order.status === 'Cancelled' ? 'text-red-500' : ''}
                  `}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4 font-serif italic">No recent orders found.</p>
            )}
          </div>
        </div>

        {/* Top Products Mock */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif text-softBrown">Best Sellers</h3>
            <button className="text-xs font-bold text-goldenYellow hover:underline uppercase tracking-widest">Analytics</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((product) => (
              <div key={product} className="flex items-center gap-4 py-3">
                <div className="w-16 h-16 bg-beige rounded-lg overflow-hidden border border-gray-50">
                   <img src={`/hero${product}.png`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-softBrown">Premium Silk Saree</h4>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${80 - product * 15}%` }}
                      className="h-full bg-goldenYellow"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-softBrown">{120 - product * 20} sales</p>
                  <p className="text-xs text-gray-400 mt-1">₹12,499</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
