import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

const initialProducts = [
  { id: 1, name: "Embroidered Silk Gown", price: 8999, image: "/crouser1.png", category: "Fancy Gowns", tag: "Trending" },
  { id: 2, name: "Golden Zari Saree", price: 12499, image: "/crouser2.png", category: "Saree & Lehenga", tag: "New" },
  { id: 3, name: "Vintage Handloom Set", price: 5799, image: "/crouser3.png", category: "Handloom", tag: "Sustainable" },
  { id: 4, name: "Bridal Lehenga Choli", price: 22999, image: "/ethnic.png", category: "Saree & Lehenga", tag: "Bestseller" },
  { id: 5, name: "Floral Anarkali Gown", price: 7499, image: "/western.png", category: "Fancy Gowns", tag: "New" },
  { id: 6, name: "Pure Silk Saree", price: 9999, image: "/saree.png", category: "Saree & Lehenga", tag: "Premium" },
  { id: 7, name: "Handwoven Cotton Kurti", price: 2499, image: "/kurti.png", category: "Handloom", tag: "Artisan" },
  { id: 8, name: "Designer Party Gown", price: 15999, image: "/crouser1.png", category: "Fancy Gowns", tag: "Exclusive" },
  { id: 9, name: "Banarasi Silk Lehenga", price: 18499, image: "/ethnic.png", category: "Saree & Lehenga", tag: "Heritage" },
];

const initialOrders = [
  {
    id: "1025",
    customer: "Aarohi Singh",
    date: "Apr 20, 2:45 PM",
    amount: 12499,
    status: "Pending",
    items: [{ id: 2, name: "Golden Zari Saree", price: 12499, qty: 1, image: "/crouser2.png" }]
  },
  {
    id: "1024",
    customer: "Neha Sharma",
    date: "Apr 19, 1:30 PM",
    amount: 22999,
    status: "Processing",
    items: [{ id: 4, name: "Bridal Lehenga Choli", price: 22999, qty: 1, image: "/ethnic.png" }]
  },
  {
    id: "1023",
    customer: "Kritika Patel",
    date: "Apr 18, 11:20 AM",
    amount: 8999,
    status: "Delivered",
    items: [{ id: 1, name: "Embroidered Silk Gown", price: 8999, qty: 1, image: "/crouser1.png" }]
  }
];

export { initialProducts as allProducts }; // Keep for legacy/initial load if needed occasionally

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem('gauri_products');
    return localData ? JSON.parse(localData) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('gauri_cart');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const localData = localStorage.getItem('gauri_wishlist');
    return localData ? JSON.parse(localData) : [];
  });

  const [profile, setProfile] = useState(() => {
    const localData = localStorage.getItem('gauri_profile');
    return localData ? JSON.parse(localData) : {
      fullName: 'Payal',
      mobile: '9340391897',
      email: '',
      gender: '',
      dob: '',
      location: '',
      altMobile: '',
      hintName: ''
    };
  });

  const [orders, setOrders] = useState(() => {
    const localData = localStorage.getItem('gauri_orders');
    return localData ? JSON.parse(localData) : initialOrders;
  });

  React.useEffect(() => {
    localStorage.setItem('gauri_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('gauri_cart', JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem('gauri_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  React.useEffect(() => {
    localStorage.setItem('gauri_profile', JSON.stringify(profile));
  }, [profile]);

  React.useEffect(() => {
    localStorage.setItem('gauri_orders', JSON.stringify(orders));
  }, [orders]);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const addProduct = (newProduct) => {
    setProducts(prev => {
      const highestId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) : 0;
      return [...prev, { ...newProduct, id: highestId + 1 }];
    });
  };

  const editProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some(item => item.id === id);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const clearCart = () => setCart([]);

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <ShopContext.Provider value={{
      products, addProduct, editProduct, deleteProduct,
      cart, wishlist, profile, updateProfile, addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isWishlisted, cartTotal, cartCount,
      orders, addOrder, updateOrderStatus
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
