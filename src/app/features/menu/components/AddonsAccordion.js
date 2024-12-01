"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { AddCategory } from "@/app/features/menu/components/MenuAccordion";
import { useMenuContext } from "@/app/features/menu/context/MenuContext";

// utils
const iconMap = {
  veg: "/veg.svg",
  nonveg: "/non-veg.svg",
  egg: "/egg.svg",
};

// Recursive component to render categories and add-on items
export function AddonCategoryComponent({ category }) {
  return (
    <Accordion type="single" collapsible value={category.name}>
      <AccordionItem value={category.name}>
        <AccordionTrigger>
          <div className="flex gap-8">{category.name}</div>
        </AccordionTrigger>
        <AccordionContent>
          {category.addons.map((item, key) => (
            <AddonItemComponent key={key} item={item} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AddonItemComponent({ item }) {
  const { toggleItemStockStatus, toggleItemFeaturedStatus, handleItemClick } = useMenuContext();
  const [inStock, setInStock] = useState(item.in_stock);

  const toggleStock = () => {
    setInStock(!inStock);
    toggleItemStockStatus(item);
  }

  return (
    <div
      className="grid grid-cols-4 w-full hover:shadow-inner p-4"
      onClick={() => handleItemClick(item, "addons")}
    >
      <div className="col-span-2">
        <span className="flex items-center font-bold">
          <Image
            src={iconMap[item.addon_type]}
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
      </div>
    </div>
  );
}

export function AddonsAccordion({ categories }) {
  const { handleAddItem } = useMenuContext();

  return (
    <TabsContent value="addons" className="">
      <AddCategory />
      <Button className="ml-2" onClick={() => handleAddItem('addon')}>Add Addon</Button>
      {categories.map((category) => (
        <AddonCategoryComponent key={category.name} category={category} />
      ))}
    </TabsContent>
  );
}
