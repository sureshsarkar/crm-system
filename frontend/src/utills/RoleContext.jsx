import React, { createContext, useState, useContext } from 'react';

// Create a Role Context
export const RoleContext = createContext();

// Custom hook to access Role Context
export const useRole = () => useContext(RoleContext);

// Role Provider Component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const myRole = localStorage.getItem("user")

  // Add product to Role
  const addToRole = (product) => {
    setRole((prevRole) => [...prevRole, product]);
  };
  

  return (
    <RoleContext.Provider value={{ role, myRole }}>
      {children}
    </RoleContext.Provider>
  );
};
