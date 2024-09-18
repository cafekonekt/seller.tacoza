"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectSearch,
} from "@/components/ui/multiselect";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";

// Dummy data object for variants
const dummyData = {
  size: [
    { variant: "Small", price: 100 },
    { variant: "Medium", price: 150 },
    { variant: "Large", price: 200 },
  ],
  color: [
    { variant: "Red", price: 50 },
    { variant: "Blue", price: 60 },
  ],
};


export function AddonsSelect() {
  return (
    <MultiSelect>
      <MultiSelectTrigger className="w-80">
        <MultiSelectValue placeholder="Select Frameworks" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectSearch placeholder="Search Addons" />
        <MultiSelectList>
          <MultiSelectItem value="Extra Cheese">
            <p className="font-medium flex items-center gap-2">
              <Image src="/veg.svg" alt="Dash" height="14" width="14" />
              Extra Cheese
              <span className="text-muted-foreground">- ₹20 </span>
            </p>
          </MultiSelectItem>
          <MultiSelectItem value="vue">Vue</MultiSelectItem>
          <MultiSelectItem value="angular">Angular</MultiSelectItem>
          <MultiSelectItem value="svelte">Svelte</MultiSelectItem>
        </MultiSelectList>
      </MultiSelectContent>
    </MultiSelect>
  );
}

export function VariantsSelect() {
  const [categories, setCategories] = useState(["size", "color"]); // List of categories
  const [parentCategory, setParentCategory] = useState(""); // Selected category
  const [variants, setVariants] = useState([]); // List of variants and prices
  const [newCategory, setNewCategory] = useState(""); // Input for new category
  const [newVariant, setNewVariant] = useState(""); // Input for new variant
  const [newPrice, setNewPrice] = useState(""); // Input for new price

  // Handle category selection
  const handleParentCategorySelect = (value) => {
    setParentCategory(value);
    if (dummyData[value]) {
      setVariants(dummyData[value]); // If category data exists, populate variants
    } else {
      setVariants([]); // If no data exists, empty the variants list
    }
  };

  // Add new category from the popover and select it
  const handleAddNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]); // Add new category
      setParentCategory(newCategory); // Auto-select the newly added category
      setVariants([]); // Clear variants for new category
      setNewCategory(""); // Reset input
    }
  };

  // Add new variant for the selected category
  const handleAddNewVariant = () => {
    if (newVariant && newPrice) {
      setVariants((prev) => [
        ...prev,
        { variant: newVariant, price: newPrice },
      ]);
      setNewVariant("");
      setNewPrice("");
    }
  };

  // Delete a variant by index
  const handleDeleteVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-sm font-semibold">Variants for {parentCategory}</h1>
        {variants.map((v, index) => (
          <Badge className="text-xs m-1" key={index}>
            {v.variant} : ₹{v.price}
          </Badge>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit" size="sm" variant="outline">
            Add/Edit Variant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Variants</DialogTitle>
            <DialogDescription>
              Add or select variants for the product, then enter prices for each
              variant.
            </DialogDescription>
          </DialogHeader>

          <Label htmlFor="CategoryName">Category</Label>
          <div className="flex gap-4">
            {/* Select Category dropdown */}
            <Select
              id="CategoryName"
              onValueChange={handleParentCategorySelect}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add New Category popup */}
            <Popover>
              <PopoverTrigger asChild>
                <Button>Add New Category</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-[6.5vh]">
                <div className="grid gap-2">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Add Category</h4>
                  </div>
                  <div>
                    <Label htmlFor="newCategory">Category Name</Label>
                    <Input
                      id="newCategory"
                      placeholder="Enter new category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <Button onClick={handleAddNewCategory}>Save</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator className="my-1" />

          <p className="text-sm text-muted-foreground">
            Add variants and their Prices for{" "}
            {parentCategory || "selected category"}
          </p>

          {variants.map((variant, index) => (
            <div key={index} id="variantName" className="flex gap-4">
              <Input
                id={`variant_${index}`}
                placeholder="Enter variant"
                className="w-[180px]"
                value={variant.variant}
                onChange={(e) =>
                  setVariants((prev) =>
                    prev.map((v, i) =>
                      i === index ? { ...v, variant: e.target.value } : v,
                    ),
                  )
                }
              />
              <Input
                type="number"
                id={`variant_price_${index}`}
                placeholder="Enter Price"
                className="w-[180px]"
                value={variant.price}
                onChange={(e) =>
                  setVariants((prev) =>
                    prev.map((v, i) =>
                      i === index ? { ...v, price: e.target.value } : v,
                    ),
                  )
                }
              />
              <Button
                variant="destructive"
                onClick={() => handleDeleteVariant(index)}
              >
                Delete
              </Button>
            </div>
          ))}

          <Button
            size="sm"
            variant="outline"
            className="w-fit"
            onClick={handleAddNewVariant}
          >
            Add New Variant
          </Button>

          <Separator className="my-1" />
          <Button>Save Changes</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
