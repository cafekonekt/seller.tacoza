"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getSubscriptionURL } from "@/app/features/orders/server/actions/subLiveOrder";
import { getOrders } from "@/app/features/orders/server/actions/getLiveOrder";

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
    const [error, subscriptionURL] = await getSubscriptionURL();
    if (error) setUrl('');
    setUrl(subscriptionURL?.url || '');
  }
  
  const fetchOrders = async () => {
    const [error, data] = await getOrders();
    if (error) {
      console.error("Error fetching orders:", error);
      return {};
    }
    setOrder(data);
    return data;
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
