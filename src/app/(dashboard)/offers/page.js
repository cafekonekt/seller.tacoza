import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Settings2, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Offers() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Offers</h1>
      </div>
      <div className="grid grid-cols-4 w-full gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="border-2 border-gray-300 rounded-lg border-dashed p-1 pr-3 w-fit">
              <Badge className="h-6 bg-green-500 font-bold text-sm mr-2">
                30% OFF
              </Badge>
              FLAT30
            </CardTitle>
            <CardDescription>Expires on 12 Aug 2024</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center justify-between">
            <p className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-2" /> 2/5
            </p>
            <div className="flex items-center gap-2">
              <Button size="sm">View</Button>
              <Button size="sm" variant="outline">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Offer</DialogTitle>
            <DialogDescription>
              This will help you create a new offer for your customers.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <Label>Coupon Code</Label>
          <Input placeholder="FLAT30" />
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="use">Usage</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <Label>Discount Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Label>Amount</Label>
              <Input placeholder="30" />
              <Label>Expiry Date</Label>
              <Input placeholder="dd-mm-yyyy" />
            </TabsContent>
            <TabsContent value="use">
              <div className="flex items-center gap-2 justify-between">
                <div>
                  <Label>Min. Spend</Label>
                  <Input placeholder="0" />
                </div>
                <div>
                  <Label>Max. Spend</Label>
                  <Input placeholder="100" />
                </div>
              </div>
              <Label>Use limit per user</Label>
              <Input placeholder="100" />
              <Label>Use limit per offer</Label>
              <Input placeholder="100" />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button>Save Changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no offers
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a offer.
          </p>
          <Button className="mt-4">Add Offer</Button>
        </div>
      </div>
    </main>
  );
}
