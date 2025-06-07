import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';

// Custom Link component that uses our controlled navigation
const Link = ({ href, children, className, ...props }) => {
  const { navigateTo } = useNavigation();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigateTo(href);
  };
  
  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default Link;
