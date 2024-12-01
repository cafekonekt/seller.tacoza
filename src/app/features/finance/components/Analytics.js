"use client"
import React, { useState, useMemo } from "react";
// components
import { ChartFinanceComponent } from "@/app/features/finance/components/Chart";
import { PayoutsFinanceTable } from "@/app/features/finance/components/Table";
// server actions
import { getOrderByDate } from "@/app/features/finance/server/actions/getOrder";

export default function Analytics({ tableData, chartData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [cachedOrders, setCachedOrders] = useState({}); // Cache to store fetched orders
  
  const handleBarClick = async (date) => {
    if (!cachedOrders[date]) {
      // Simulate fetching data (use dummy data here)
      const payoutForDay = tableData[date] || [];
      const [error, ordersForDay] = await getOrderByDate(date);

      // Cache the fetched data
      setCachedOrders((prevCache) => ({
        ...prevCache,
        [date]: {
          orders: ordersForDay.results,
          payout: payoutForDay,
        },
      }));
    }
    setSelectedDate(date);
  };
  
  return (
    <div>
      <ChartFinanceComponent handleBarClick={handleBarClick} chartData={chartData} />
      <PayoutsFinanceTable selectedDate={selectedDate} orders={cachedOrders[selectedDate] || []} />
    </div>
  );
}
