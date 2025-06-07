// src/app/components/EarthWrapper.js
"use client";

import dynamic from 'next/dynamic';

const Earth = dynamic(() => import('./earth/earth'), {
  ssr: false,
  loading: () => <img src="/assets/placeholder.png" alt="Loading..." />
});

export default function EarthWrapper() {
  return <Earth />;
}
