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
    newOrders: [],
    preparing: [],
    completed: [],
  });
  const [subscriptionURL, setUrl] = useState('');
  
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
    fetchOrders();
    fetchSubscriptionURL();
    console.log("fetching orders");
  }, []);
  
  return (
    <OrderContext.Provider value={{ liveOrder, subscriptionURL, fetchOrders, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
