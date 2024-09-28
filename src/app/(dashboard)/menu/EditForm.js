"use client";
import React, { useState, useEffect } from "react";
import { useMenuContext } from "@/context/MenuContext";
import { Button } from "@/components/ui/button";
import {
  CircleHelp,
  ImagePlus,
  IndianRupee,
  Link,
  SquareDot,
  Trash,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GalleryDialog } from "./gallery";
import { VariantsSelect, AddonsSelect } from "./forvariants";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// utils
const iconMap = {
  veg: "/veg.svg",
  nonveg: "/non-veg.svg",
  egg: "/egg.svg",
};

export function EditForm({ foodCategory, addonCategory, type }) {
  const { selectedItem, handleSave, handleUpdate, handleItemClick } = useMenuContext();

  const [formData, setFormData] = useState(selectedItem);

  useEffect(() => {
    setFormData(selectedItem);
  }, [selectedItem]);

  const selectedCategory = foodCategory.filter(
    (cat) => cat.name === formData?.food_category,
  )[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (formData.mode === "add") {
      handleSave({ ...formData }, type); // Pass type to handleSave
    } else {
      handleUpdate({ ...formData }, type); // Pass type to handleUpdate
    }
  };

  return formData ? (
    <div className="col-span-1 p-8 bg-accent overflow-y-scroll">
      <div className="flex items-center justify-between my-3">
        <Input
          className="text-lg w-fit bg-white"
          placeholder={formData.type === "menu" ? "Item Name" : "Addon Name"} // Adjust placeholder based on type
          value={formData.name || ""}
          name="name"
          onChange={handleInputChange}
        />
        <div className="flex gap-2 text-gray-500">
          <Trash className="h-5 w-5" />
          <X className="h-5 w-5" onClick={() => handleItemClick(null)} />
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Food Type */}
      <div className="mt-4">
        <h2 className="flex items-center font-semibold text-base mb-1">
          Food Type <CircleHelp className="ml-2 h-5 w-5" />
        </h2>
        <Card className="flex gap-4 p-4">
          <ToggleGroup
            type="single"
            variant="outline"
            className="flex gap-4 p-4"
            value={formData.type==="menu" ? formData.food_type : formData.addon_type}
          // onValueChange={(value) => setFoodTypeFilter(value)} // Set filter state
          >
            {Object.keys(iconMap).map((type, key) => (
              <ToggleGroupItem
                key={key}
                value={type}
                aria-label="Veg Filter"
                className="gap-2 px-4 data-[state=on]:bg-gray-100 align-left"
              >
                <Image
                  src={iconMap[type]}
                  alt="Veg"
                  height="16"
                  width="16"
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Card>
      </div>

      {/* Pricing */}
      <div className="mt-4">
        <h2 className="flex items-center font-semibold text-base mb-1">
          Pricing <CircleHelp className="ml-2 h-5 w-5" />
        </h2>
        <Card className="flex gap-4 p-4">
          <div>
            <Label>Base Price</Label>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 text-gray-500 mr-2" />
              <Input
                type="number"
                placeholder="Enter Base Price"
                name="price"
                value={Number(formData.price) || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Label>Taxes and Charges</Label>
            <div className="flex items-center gap-2">
              <Select
                value={formData.tax || ""}
                onValueChange={(value) => handleSelectChange("tax", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="GST 5.0%" />
                </SelectTrigger>
              </Select>
              <Select
                value={formData.charges || ""}
                onValueChange={(value) => handleSelectChange("charges", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Charges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Category */}
      <div className="mt-4">
        <h2 className="flex items-center font-semibold text-base mb-1">
          Category <CircleHelp className="ml-2 h-5 w-5" />
        </h2>
        <Card className="flex gap-4 p-4">
          <div className="col-span-2">
            <Select
              value={selectedCategory?.id}
              onValueChange={(value) =>
                handleSelectChange("dishCategory", value)
              }
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Dish Category" />
              </SelectTrigger>
              <SelectContent value={formData.category}>
                {foodCategory.map((category, key) => (
                  <SelectItem value={category.id} key={key}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      {/* Images */}
      {formData.type === "menu" && (
        <div className="mt-4">
          <h2 className="flex items-center font-semibold text-base mb-1">
            Images <CircleHelp className="ml-2 h-5 w-5" />
          </h2>
          <Card className="flex gap-4 p-4">
            <div className="flex items-center justify-center w-24 h-20 border rounded-lg">
              <Image
                src={"/pizza.jpg"}
                alt="Restaurant"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <input
              type="file"
              id="photo"
              className="opacity-0 z-[-1] absolute"
            />
            <label
              htmlFor="photo"
              className="flex flex-col text-sm text-blue-500 font-bold items-center justify-center p-4 w-24 h-20 border rounded-lg cursor-pointer hover:shadow-md"
            >
              <ImagePlus className="w-8 h-8 " />
              Upload
            </label>
          </Card>
        </div>
      )}

      {/* Description */}
      <div className="mt-4">
        <h2
          htmlFor="item-description"
          className="flex items-center font-semibold text-base mb-1"
        >
          Item Description <CircleHelp className="ml-2 h-5 w-5" />
        </h2>
        <Textarea
          id="item-description"
          placeholder="Enter Description"
          className="bg-white"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* Customization */}
      {formData.type === "menu" && (
        <div className="mt-4">
          <h2 className="flex items-center font-semibold text-base mb-1">
            Customization <CircleHelp className="ml-2 h-5 w-5" />
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>Variants</CardHeader>
              <CardContent>
                {formData.variants &&
                  formData.variants.type?.length > 0 &&
                  formData.variants.type.map((variant, key) => (
                    <Badge
                      key={key}
                      className="m-1"
                    >{`${variant.name} | ₹${variant.price}`}</Badge>
                  ))}
              </CardContent>
              <CardFooter>
                <VariantsSelect />
              </CardFooter>
            </Card>
            <Card className="col-span-1">
              <CardHeader>Add-ons</CardHeader>
              <CardContent>
                <AddonsSelect />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Dish Details */}
      {formData.type === "menu" && (
        <div className="mt-4">
          <h2
            htmlFor="dish-details"
            className="flex items-center font-semibold text-base mb-1"
          >
            Dish Details
          </h2>
          <Card className="p-8 grid grid-cols-2 gap-2">
            <div>
              <Label>Serving Info</Label>
              <Select
                value={formData.servingInfo || ""}
                onValueChange={(value) =>
                  handleSelectChange("servingInfo", value)
                }
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select Qty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="1-2">1-2 People</SelectItem>
                  <SelectItem value="2-4">2-4 People</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Preparation Time</Label>
              <Select
                value={formData.preparationTime || ""}
                onValueChange={(value) =>
                  handleSelectChange("preparationTime", value)
                }
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Mins</SelectItem>
                  <SelectItem value="20">20 Mins</SelectItem>
                  <SelectItem value="30">30 Mins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Spice Level</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleSelectChange("spiceLevel", "Medium Spicy")
                  }
                >
                  Medium Spicy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("spiceLevel", "Mild")}
                >
                  Mild
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("spiceLevel", "Very Spicy")}
                >
                  Very Spicy
                </Button>
              </div>
            </div>
            <div className="col-span-2">
              <Label>Beverages</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("beverages", "Coke")}
                >
                  Coke
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("beverages", "Pepsi")}
                >
                  Pepsi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("beverages", "Sprite")}
                >
                  Sprite
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("beverages", "Diet Coke")}
                >
                  Diet Coke
                </Button>
              </div>
            </div>
            <div className="col-span-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("tags", "Exclusive")}
                >
                  Exclusive
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("tags", "Chefs Special")}
                >
                  Chefs Special
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("tags", "New")}
                >
                  New
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Button
        className="mt-4"
        onClick={handleSaveChanges} // Use the new save function
      >
        {formData.mode === "add" ? "Add Item" : "Update Item"}
      </Button>
    </div>
  ) : (
    <div className="col-span-1 flex items-center justify-center bg-accent">
      <h2 className="text-lg font-semibold text-center">
        Select an item to edit
      </h2>
    </div>
  );
}
