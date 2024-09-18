
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
    CloudUpload,
    Edit,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

function PaymentSettings() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p className="font-bold mb-2">Restaurant Details</p>
                <Button className="text-sm">
                    <Edit className="w-4 h-4 mr-2" /> Edit Account Details
                </Button>
            </div>

            <Label htmlFor="name">Account Number</Label>
            <Input type="text" id="name" placeholder="Account Number" />

            <Label htmlFor="name">Re-enter Account Number</Label>
            <Input type="text" id="name" placeholder="Account Number" />

            <Label htmlFor="name">Account Holder Name</Label>
            <Input type="text" id="name" placeholder="Name" />

            <Label htmlFor="name">IFSC Code</Label>
            <Input type="text" id="name" placeholder="IFSC Code" />

            <Label htmlFor="name">Bank Name</Label>
            <Input type="text" id="name" placeholder="Bank Name" />

            <Label htmlFor="name">Branch Name</Label>
            <Input type="text" id="name" placeholder="Branch Name" />

            <Label htmlFor="name">Branch Address</Label>
            <Input type="text" id="name" placeholder="Branch Address" />

            <Label htmlFor="name">Upload Passbook or Cancelled Cheque</Label>
            <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center aspect-video w-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="text-gray-500 dark:text-gray-400" size={32} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
    );
}


export function RestaurantPayment() {
    return (
        <TabsContent value="payment">
            <Card className="p-8">
                <PaymentSettings />
            </Card>
        </TabsContent>
    )
}