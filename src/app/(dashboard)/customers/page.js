"use client"

import React, { useState } from "react";
import { Table } from "@/components/ui/table"; // Import the Table component

// Example customer data
const customerData = [
  { name: "John Doe", contactNumber: "123-456-7890", frequency: 15 },
  { name: "Jane Smith", contactNumber: "987-654-3210", frequency: 22 },
  { name: "Emily Johnson", contactNumber: "555-666-7777", frequency: 30 },
  // Add more customer data as needed
];

// Metadata for the page
const metaData = {
  title: "Customer Information",
  description: "A list of customers with their contact details and order frequency.",
};

export default function CustomerPage() {
  const [sortOption, setSortOption] = useState("name"); // State to manage sorting option

  // Function to sort customer data based on the selected option
  const sortedData = [...customerData].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "frequency") {
      return a.frequency - b.frequency;
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <meta name="description" content={metaData.description} />
      <title>{metaData.title}</title>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{metaData.title}</h1>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="frequency">Sort by Frequency</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <Table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency of Orders</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((customer, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{customer.contactNumber}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{customer.frequency}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
