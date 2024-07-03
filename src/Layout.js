// src/Layout.js
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Head from './Head';
import Footer from './Footer';

const Layout = ({ children }) => (
  <HelmetProvider>
    <Head />
    <div className="p-4 max-w-6xl mx-auto bg-gray-100">
      {children}
    </div>
    <Footer />
  </HelmetProvider>
);

export default Layout;
