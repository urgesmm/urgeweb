import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import Orb from '../components/orb';
import Navbar from '../components/Navbar';
import LazyLoader from '../components/LazyLoader';

const ss = () => {
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect will run only on client-side
  useEffect(() => {
    // You can add additional loading logic here if needed
    // For example, check if images or other resources are loaded
  }, []);

  return (
    <div>
      <Head>
        <title>Australia Visa Programs | URGE MANAGEMENT</title>
        <meta name="description" content="OUR SUCCESS STORIES" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Full screen black lazy loader */}
      <LazyLoader isLoading={isLoading} setIsLoading={setIsLoading} />

      {/* Main content */}
      <Navbar />
      
      <Orb />
    </div>
  )
}

export default ss