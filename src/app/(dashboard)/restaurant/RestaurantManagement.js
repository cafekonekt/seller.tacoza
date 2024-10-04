"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { HandPlatter, LocateFixed, ShoppingBag, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TimePickerDemo } from "./timeSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OutletTimings() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const initialDate = new Date(); // Initialize with current time

  const [dates, setDates] = React.useState(
    daysOfWeek.map(() => ({
      opening: new Date(initialDate),
      closing: new Date(initialDate),
    })),
  );

  const handleDateChange = (dayIndex, type, newDate) => {
    const updatedDates = [...dates];
    updatedDates[dayIndex][type] = newDate;
    setDates(updatedDates);
  };

  return (
    <Table>
      <TableCaption>
        Your outlet will be automatically marked online in these timings.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Day</TableHead>
          <TableHead>Opening</TableHead>
          <TableHead></TableHead>
          <TableHead>Closing</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dates.map((dayData, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <Checkbox id={`day${index}`} />
                <label
                  htmlFor={`day${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {daysOfWeek[index]}
                </label>
              </div>
            </TableCell>
            <TableCell>
              <TimePickerDemo
                id={`opening-${index}`}
                date={dayData.opening}
                setDate={(newDate) =>
                  handleDateChange(index, "opening", newDate)
                }
              />
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <TimePickerDemo
                id={`closing-${index}`}
                date={dayData.closing}
                setDate={(newDate) =>
                  handleDateChange(index, "closing", newDate)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function RestaurantManagement({ outlet }) {
  const [formData, setFormData] = React.useState(outlet || {
    name: "",
    description: "",
    address: "",
    services: [],
    email: "",
    phone: "",
  });
  const [isChanged, setIsChanged] = React.useState(false);

  const handleCheckboxChange = (e) => {
    console.log("Checkbox changed", e);
    const { id, checked } = e.target;
    setFormData((prevData) => {
      const services = checked
        ? [...prevData.services, id]
        : prevData.services.filter((service) => service !== id);
      return {
        ...prevData,
        services,
      };
    });
    setIsChanged(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setIsChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated data:", formData);
    setIsChanged(false);
  };

  return (
    <TabsContent value="info">
      <Card className="p-4">
        <div className="grid grid-cols-3">
          <form
            className="grid md:col-span-1 w-full max-w-sm items-center gap-3"
            onSubmit={handleSubmit}
          >
            <p className="font-bold mb-2">Restaurant Details</p>
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Sagar Gaire"
            />

            <Label htmlFor="description">Restaurant Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type your description here."
            />

            <Label htmlFor="address">Restaurant Address</Label>
            <Input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="6 Yukon Drive Raeford, NC 28376"
            />

            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <Label htmlFor="phone">Phone</Label>
            <Input
              type="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91-8877665522"
            />

            <div className="mt-4">
              <h2 className="flex items-center font-semibold text-base mb-1">
                Service Type
              </h2>
              <Card className="flex gap-2 p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dine_in"
                    checked={formData.services.includes("dine_in")}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="dine_in"
                    className="flex gap-2 items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <HandPlatter /> DineIn
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="takeaway"
                    checked={formData.services.includes("takeaway")}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="takeaway"
                    className="flex gap-2 items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <ShoppingBag /> Takeaway
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delivery"
                    checked={formData.services.includes("delivery")}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="delivery"
                    className="flex gap-2 items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Truck /> Delivery
                  </label>
                </div>
              </Card>
            </div>

            <div className="relative">
              <Label htmlFor="dropzone-file">Location</Label>
              <iframe
                className="w-full h-52 border-0 rounded-xl"
                src="https://www.google.com/maps/embed/v1/place?q=hotel+taj+mumbai&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              />
              <Button className="absolute top-4 right-2 mt-4">
                <LocateFixed className="w-4 h-4 mr-2" /> Select Location
              </Button>
            </div>

            {isChanged && (
              <Button type="submit" className="mt-4">
                Update Information
              </Button>
            )}
          </form>

          <div className="flex flex-col md:col-span-1 w-full max-w-sm gap-3">
            <p className="font-bold mb-2">Orders</p>
            <Label htmlFor="min">Minimun Order Value</Label>
            <Input type="number" id="min" placeholder="Rs. 149" />

            <Label htmlFor="avgtime">
              Average order prepare time in minutes
            </Label>
            <Select id="avgtime">
              <SelectTrigger>
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Mins</SelectItem>
                <SelectItem value="45">45 Mins</SelectItem>
                <SelectItem value="60">60 Mins</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="septime">Time slots separated in minutes</Label>
            <Select id="septime">
              <SelectTrigger>
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Mins</SelectItem>
                <SelectItem value="20">20 Mins</SelectItem>
                <SelectItem value="30">30 Mins</SelectItem>
              </SelectContent>
            </Select>

            <p className="font-bold my-4">Whatsapp</p>
            <Label htmlFor="whatsapp">Whatsapp Number</Label>
            <Input type="phone" id="whatsapp" placeholder="+91-8877665522" />
          </div>

          <div className="flex flex-col col-span-1">
            <p className="font-bold mb-2">Operational Timings</p>
            <div className="w-fit border rounded-lg p-4">
              <OutletTimings />
            </div>
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}