import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ListOrdered, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Products', icon: ShoppingBag, path: '/admin/products' },
    { label: 'Orders', icon: ListOrdered, path: '/admin/orders' },
    { label: 'Customers', icon: Users, path: '/admin/customers' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className={`w-64 h-screen bg-softBrown text-white flex flex-col shadow-xl fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-widest uppercase">Gauri Admin</h1>
        <button onClick={closeSidebar} className="md:hidden text-white/70 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-goldenYellow text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} strokeWidth={1.5} />
                    <span className="text-sm font-medium tracking-wide">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-white/10">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
          <LogOut size={20} strokeWidth={1.5} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
