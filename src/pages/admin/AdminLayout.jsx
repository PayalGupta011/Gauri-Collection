import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-softBrown text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-lg font-serif tracking-widest uppercase">Gauri Admin</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="p-1">
          <Menu size={24} />
        </button>
      </div>

      <AdminSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 md:ml-64 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
