"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { EllipsisVertical, SquareDot, Star } from "lucide-react";
import { useMenuContext } from "@/context/MenuContext";
import { AddCategory } from "./MenuAccordion";

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
  
  return (
    <div 
      className="grid grid-cols-4 w-full hover:shadow-inner p-4"
      onClick={() => handleItemClick(item, "addons")}
    >
      <div className="col-span-2">
        <span className="flex items-center font-bold">
          <SquareDot className={`w-4 h-4 mr-2 ${item.statusColor}`} />
          {item.name}
        </span>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <p className="font-bold col-span-1 text-center">{item.price}</p>
      <div className="flex items-center gap-2 col-span-1 justify-end">
        <Star className="w-6 h-6 text-gray-500 hover:fill-yellow-300" />
        <EllipsisVertical className="w-6 h-6 text-gray-500" />
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
