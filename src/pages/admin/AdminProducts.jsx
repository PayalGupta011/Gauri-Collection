import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useShop } from '../../context/ShopContext';

const AdminProducts = () => {
  const { products, addProduct, editProduct, deleteProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Fancy Gowns',
    tag: 'New',
    image: '/crouser1.png'
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        tag: product.tag,
        image: product.image
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', price: '', category: 'Fancy Gowns', tag: 'New', image: '/crouser1.png' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price)
    };

    if (editingId) {
      editProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-softBrown">Product Catalog</h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Manage your boutique inventory</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-softBrown text-white px-6 py-3 rounded-lg text-sm font-bold tracking-[0.2em] uppercase hover:bg-goldenYellow transition-all duration-300 shadow-lg"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-goldenYellow outline-none"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-softBrown" size={16} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-6 py-3 bg-gray-50 text-softBrown rounded-xl text-xs font-bold uppercase tracking-widest outline-none hover:bg-beige transition-colors appearance-none cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Fancy Gowns">Fancy Gowns</option>
              <option value="Saree & Lehenga">Saree & Lehenga</option>
              <option value="Handloom">Handloom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 italic">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-softBrown">{product.name}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">SKU: GC-{1000 + product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span className="text-[10px] px-3 py-1 bg-beige/50 text-softBrown rounded-full uppercase tracking-widest font-bold">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-5">
                  <p className="text-sm font-bold text-goldenYellow italic font-sans">₹{product.price.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal(product)} className="p-2 text-softBrown hover:text-goldenYellow transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-softBrown hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400 font-serif">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-serif text-softBrown">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tag (e.g. New)</label>
                  <input 
                    type="text" 
                    value={formData.tag}
                    onChange={e => setFormData({...formData, tag: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm mt-1"
                >
                  <option value="Fancy Gowns">Fancy Gowns</option>
                  <option value="Saree & Lehenga">Saree & Lehenga</option>
                  <option value="Handloom">Handloom</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Image URL (Mock)</label>
                <select 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:outline-none focus:border-goldenYellow text-sm mt-1"
                >
                  <option value="/crouser1.png">Gown Image 1 (/crouser1.png)</option>
                  <option value="/crouser2.png">Saree Image 1 (/crouser2.png)</option>
                  <option value="/crouser3.png">Handloom Image 1 (/crouser3.png)</option>
                  <option value="/ethnic.png">Lehenga Image (/ethnic.png)</option>
                  <option value="/western.png">Western Image (/western.png)</option>
                  <option value="/saree.png">Saree Image 2 (/saree.png)</option>
                  <option value="/kurti.png">Kurti Image (/kurti.png)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-white bg-softBrown hover:bg-goldenYellow transition-colors shadow-lg">
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
