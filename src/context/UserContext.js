'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiPost } from '@/handlers/apiHandler';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem('user'); // Simulate user retrieval from storage
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const response = await apiPost('/api/auth/login/', userData);
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response)); // Store user in local storage
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
