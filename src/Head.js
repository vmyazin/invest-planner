// src/Head.js
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from './config';

const Head = () => (
  <HelmetProvider>
    <Helmet>
      <title>{config.siteName}</title>
      <meta property="og:title" content={config.siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={config.ogImage} />
      <meta property="og:url" content={config.url} />
      <meta name="description" content={config.description} />
      <meta property="og:description" content={config.description} />
      <meta name="twitter:creator" content={config.twitterCreator} />
      <meta name="twitter:title" content={config.siteName} />
      <meta name="twitter:description" content={config.siteName} />
      <meta name="twitter:image" content={config.twitterImage} />
    </Helmet>
  </HelmetProvider>
);

export default Head;
