// componets
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

import { CloudUpload, Edit } from "lucide-react";

export function OutletDocuments() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-bold mb-2">Outlet Documentation</p>
        <Button className="text-sm">
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      </div>

      <Label htmlFor="name">Business PAN</Label>
      <Input type="text" id="name" placeholder="PAN" />

      <Label htmlFor="name">Name on PAN</Label>
      <Input type="text" id="name" placeholder="Name" />

      <Label htmlFor="name">FSSAI License Number</Label>
      <Input type="text" id="name" placeholder="License Number" />

      <Label htmlFor="name">Renewal/Expiry Date</Label>
      <Input type="text" id="name" placeholder="IFSC Code" />

      <Label htmlFor="name">Upload FSSAI Certificate</Label>
      <label
        for="dropzone-file"
        className="flex flex-col items-center justify-center aspect-video w-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudUpload className="text-gray-500 dark:text-gray-400" size={32} />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>

      <Label htmlFor="name">GST Number</Label>
      <Input type="text" id="name" placeholder="Bank Name" />
    </div>
  );
}

export function RestaurantDocument() {
  return (
    <TabsContent value="documents">
      <Card className="p-8">
        <OutletDocuments />
      </Card>
    </TabsContent>
  );
}
