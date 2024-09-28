'use client';
import { useState } from "react";
import { useMenuContext } from "@/context/MenuContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { EllipsisVertical, SquareDot, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// utils
const iconMap = {
  veg: "/veg.svg",
  nonveg: "/non-veg.svg",
  egg: "/egg.svg",
};

export function AddCategory() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto">Add Category</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-[6.5vh]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add new category</h4>
            <p className="text-sm text-muted-foreground">Parent Category </p>
          </div>

          <div>
            <Label htmlFor="width">Name</Label>
            <Input id="width" placeholder="Name" className="col-span-2 h-8" />
          </div>
          <Button>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MenuItemComponent({ item }) {
  const { toggleItemStockStatus, toggleItemFeaturedStatus, handleItemClick } = useMenuContext();
  const [isFeatured, setIsFeatured] = useState(item.featured);
  const [inStock, setInStock] = useState(item.in_stock);

  const toggleFeatured = () => {
    setIsFeatured(!isFeatured);
    toggleItemFeaturedStatus(item);
  }
  const toggleStock = () => {
    setInStock(!inStock);
    toggleItemStockStatus(item);
  }

  return (
    <div
      className="grid grid-cols-4 w-full hover:shadow-sm p-4 border-b"
      onClick={() => handleItemClick(item, "menu")}
    >
      <div className="col-span-2">
        <span className="flex items-center font-bold cursor-pointer">
          <Image
            src={iconMap[item.food_type]}
            alt="Dash"
            height="16"
            width="16"
            className="mr-2"
          />
          {item.name}
        </span>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <p className="font-bold col-span-1 text-center">{item.price}</p>
      <div className="flex items-center gap-2 col-span-1 justify-end">
        <Switch onClick={toggleStock} checked={inStock} />
        <Star className={`w-6 h-6 text-gray-500 ${isFeatured ? 'fill-yellow-300' : ''}`} onClick={toggleFeatured} />
      </div>
    </div>
  );
}

// Recursive component to render categories, subcategories, and menu items
function CategoryComponent({ category }) {
  return (
    <Accordion type="single" collapsible value={category.name}>
      <AccordionItem value={category.name}>
        <AccordionTrigger>
          <div className="flex gap-8">{category.name}</div>
        </AccordionTrigger>
        <AccordionContent>
          {/* Check if sub_categories exists and has items */}
          {Array.isArray(category.sub_categories) &&
            category.sub_categories.length > 0
            ? // If subcategories exist, recursively render them
            category.sub_categories.map((subCategory, key) => (
              <CategoryComponent
                key={key}
                category={subCategory}
              />
            ))
            : // If no subcategories, render the menu items
            category.food_items.map((item, key) => (
              <MenuItemComponent key={key} item={item} />
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function MenuAccordion({ categories }) {
  const { handleAddItem } = useMenuContext();

  return (
    <TabsContent value="items" className="relative">
      <AddCategory />
      <Button className="ml-2" onClick={() => handleAddItem("menu")}>Add Item</Button>
      {categories &&
        categories.map((category, key) => (
          <CategoryComponent key={key} category={category} />
        ))}
    </TabsContent>
  );
}
