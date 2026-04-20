import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-beige">
      <div className="h-[118px]"></div>
      
      <div className="bg-softBrown py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-contentWhite">Contact Us</h1>
        <p className="mt-4 text-goldenYellow/70 font-sans text-xs tracking-[0.4em] uppercase">We would love to hear from you</p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-serif text-softBrown mb-10">Get in Touch</h2>
            <p className="text-softBrown/70 font-sans mb-12 leading-loose">
              Whether you have a question about our festive collection, need help with sizing, or want to discuss a custom bridal project—our team is here for you.
            </p>

            <div className="space-y-10">
              {[
                { icon: Phone, title: 'Call Us', content: '+91 98765 43210' },
                { icon: Mail, title: 'Email Us', content: 'contact@gauricollection.in' },
                { icon: MapPin, title: 'Visit Us', content: '123 Heritage Lane, Textile Market, Surat, Gujarat - 395003' },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-14 h-14 bg-contentWhite rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} className="text-goldenYellow" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-softBrown leading-none mb-2">{item.title}</h3>
                    <p className="font-sans text-softBrown/60 text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-contentWhite p-10 md:p-14 shadow-2xl rounded-sm border border-softBrown/5">
            <h2 className="text-2xl font-serif text-softBrown mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-softBrown/50 font-bold">First Name</label>
                  <input type="text" className="w-full bg-beige/30 border-b border-softBrown/20 py-3 focus:outline-none focus:border-goldenYellow transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-softBrown/50 font-bold">Last Name</label>
                  <input type="text" className="w-full bg-beige/30 border-b border-softBrown/20 py-3 focus:outline-none focus:border-goldenYellow transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-softBrown/50 font-bold">Email Address</label>
                <input type="email" className="w-full bg-beige/30 border-b border-softBrown/20 py-3 focus:outline-none focus:border-goldenYellow transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase text-softBrown/50 font-bold">Message</label>
                <textarea rows="4" className="w-full bg-beige/30 border-b border-softBrown/20 py-3 focus:outline-none focus:border-goldenYellow transition-colors"></textarea>
              </div>
              <button className="w-full bg-softBrown text-contentWhite py-5 font-sans text-xs tracking-[0.4em] font-medium flex items-center justify-center gap-4 hover:bg-goldenYellow transition-colors duration-300">
                SEND MESSAGE <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
