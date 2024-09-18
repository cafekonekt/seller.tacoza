// components/InvoiceTemplate.js
import React from "react";

const items = [
  { name: "Burger", qty: 2, price: 9.99 },
  { name: "Fries", qty: 1, price: 3.99 },
  { name: "Soda", qty: 2, price: 1.99 },
  { name: "Salad", qty: 1, price: 7.99 },
];

const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
const cash = 50;
const change = cash - total;

const InvoiceTemplate = React.forwardRef((props, ref) => (
  <div ref={ref} className="font-mono bg-white p-6 max-w-sm mx-auto">
    <div className="text-center mb-4">
      <h1 className="text-xl font-bold">RECEIPT</h1>
      <div className="text-sm">
        <p>Tasty Bites Restaurant</p>
        <p>123 Food Street, Flavortown</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Cashier: #3</p>
      </div>
    </div>

    <div className="border-t border-b border-gray-300 py-2 mb-4">
      <div className="grid grid-cols-12 text-sm font-bold mb-1">
        <div className="col-span-6">Item</div>
        <div className="col-span-2 text-right">Qty</div>
        <div className="col-span-4 text-right">Price</div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 text-sm">
          <div className="col-span-6">{item.name}</div>
          <div className="col-span-2 text-right">{item.qty}</div>
          <div className="col-span-4 text-right">
            ${(item.price * item.qty).toFixed(2)}
          </div>
        </div>
      ))}
    </div>

    <div className="text-sm mb-4">
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Cash</span>
        <span>${cash.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Change</span>
        <span>${change.toFixed(2)}</span>
      </div>
    </div>

    <div className="text-center text-sm">
      <p className="font-bold mb-2">THANK YOU!</p>
      <p className="mb-2">Please come again</p>
      <div className="bg-gray-200 h-24 w-24 mx-auto mb-2"></div>
      <p className="text-xs">Scan QR code for rewards</p>
    </div>
  </div>
));

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;
