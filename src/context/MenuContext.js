'use client';
import { addItem } from '@/lib/menu/addItem';
import { updateItem } from '@/lib/menu/updateItem';
// MenuContext.js
import React, { createContext, useState, useContext } from 'react';


// Create the context
const MenuContext = createContext();

// Create a custom hook to use the MenuContext
export const useMenuContext = () => useContext(MenuContext);

// Context provider component
export const MenuProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // To manage all menu items
  const [addonItems, setAddonItems] = useState([]); // Manage addon items

  const handleAddItem = (type = "menu") => {
    setSelectedItem({
      name: "",
      food_category: "",
      price: "",
      description: "",
      type: type || "menu",
      mode: "add",
    });
  };

  // Function to handle item selection
  const handleItemClick = (item, type = "menu") => {
    setSelectedItem({
      ...item,
      type: type || "menu",
      mode: "edit",
    });
  };

  // Function to toggle item in stock status
  const toggleItemStockStatus = (itemId) => {
    let timer;
    return (item) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateItem({
          slug: item.slug,
          in_stock: !item.in_stock,
        });
      }, 300); // 300ms debounce delay
    };
  };

  // Function to toggle item featured status
  const toggleItemFeaturedStatus = (() => {
    let timer;
    return (item) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateItem({
          slug: item.slug,
          featured: !item.featured,
        });
      }, 300); // 300ms debounce delay
    };
  })();

  // Function to save the edited item details
  const handleSave = (item, type = "menu") => {
    if (type === "menu") {
      console.log(item, "Updated Item");
      // addItem(item);
    } else {
      // Handle addon saving logic here
      setAddonItems((prevItems) =>
        prevItems.map((item) =>
          item.id === item.id ? item : item
        )
      );
    }
    setSelectedItem(null); // Optionally reset selected item after saving
  };

  return (
    <MenuContext.Provider
      value={{
        selectedItem,
        handleItemClick,
        handleAddItem,
        toggleItemStockStatus,
        toggleItemFeaturedStatus,
        handleSave,
        menuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
