// src/components/Footer.js
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-200 text-center mt-8 py-4">
    <p className="text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Investment Plan. All rights reserved.
    </p>
    <p className="text-xs text-gray-400 mt-2 max-w-4xl mx-auto">
      The information provided on this website is for informational purposes only and does not constitute financial, investment, or legal advice. 
      No information on this site constitutes a recommendation that any investment, strategy, or financial product is suitable for any specific person. 
      You should not make any decision, financial, investment, trading or otherwise, based on any of the information presented on this site without undertaking 
      independent due diligence and consultation with a professional broker or financial advisory. The content on this website is subject to change without notice 
      and is provided "as is" without any representations or warranties, express or implied.
    </p>
  </footer>
);

export default Footer;
