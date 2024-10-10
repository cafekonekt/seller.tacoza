"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getSubscriptionURL } from "@/lib/orders/subLiveOrder";
import { getOrders } from "@/lib/orders/getLiveOrder";

// Create the context
const OrderContext = createContext();

// Create a custom hook to use the OrderContext
export const useOrderContext = () => useContext(OrderContext);

// Context provider component
export const OrderProvider = ({ children }) => {
  const [liveOrder, setOrder] = useState({
    new: [],
    preparing: [],
    completed: [],
  });
  const [subscriptionURL, setUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false); // Connection status

  const fetchSubscriptionURL = async () => {
    const subscriptionURL = await getSubscriptionURL();
    setUrl(subscriptionURL?.url || '');
  }
  
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrder(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  useEffect(() => {
    Promise.all([fetchOrders(), fetchSubscriptionURL()]);
  }, []);
  
  return (
    <OrderContext.Provider value={{ liveOrder, subscriptionURL, fetchOrders, setOrder, isConnected, setIsConnected }}>
      {children}
    </OrderContext.Provider>
  );
};
