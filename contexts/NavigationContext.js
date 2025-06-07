import { createContext, useContext } from 'react';

// Create a context for navigation
export const NavigationContext = createContext({
  navigateTo: () => {},
  CustomLink: () => null
});

// Custom hook to use the navigation context
export const useNavigation = () => useContext(NavigationContext);
