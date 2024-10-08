'use client'
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOffer } from "@/lib/offer/createOffer";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";

const initialFormState = {
    coupon_code: '',
    discount_type: '',
    discount_value: '',
    valid_from: new Date().toISOString().split('T')[0],
    valid_to: new Date().toISOString().split('T')[0],
    minimum_order_value: '',
    max_order_value: '',
    use_limit_per_user: '',
    use_limit: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="mt-3">
            Add
        </Button>
    );
}

export function AddOffer() {
    const { toast } = useToast();
    const [formData, setFormData] = useState(initialFormState);
    const [activeTab, setActiveTab] = useState("general");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();
        const requiredFields = {
            general: ["coupon_code", "discount_type", "discount_value", "valid_from", "valid_to"],
            use: ["minimum_order_value", "max_order_value", "use_limit_per_user", "use_limit"],
        };

        for (const tab in requiredFields) {
            const isTabValid = requiredFields[tab].every((field) => formData[field]);
            if (!isTabValid) {
                setActiveTab(tab);
                toast({
                    variant: "destructive",
                    title: `Please fill out all required fields in the ${tab.charAt(0).toUpperCase() + tab.slice(1)} tab.`,
                });
                return;
            }
        }
        
        const response = await createOffer(formData);
        toast({
            variant: response.status,
            title: response.message,
        });
    };

    return (
        <Dialog>
            <DialogTrigger>Create Offer</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Offer</DialogTitle>
                    <DialogDescription>
                        This will help you create a new offer for your customers.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form onSubmit={handleSubmit}>
                    <Label>Coupon Code</Label>
                    <Input
                        placeholder="FLAT30"
                        name="coupon_code"
                        value={formData.coupon_code}
                        onChange={handleInputChange}
                        required
                    />
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="use">Usage</TabsTrigger>
                            <TabsTrigger value="product">Product</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <Label>Discount Type</Label>
                            <Select
                                name="discount_type"
                                defaultValue={formData.discount_type}
                                onValueChange={(e) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        discount_type: e,
                                    }));
                                }}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select discount type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="flat">Flat</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label>Discount Value</Label>
                            <Input
                                placeholder="30"
                                name="discount_value"
                                value={formData.discount_value}
                                onChange={handleInputChange}
                                required
                            />
                            <Label>Valid From</Label>
                            <Input
                                placeholder="yyyy-mm-dd"
                                name="valid_from"
                                value={formData.valid_from}
                                onChange={handleInputChange}
                                required
                            />
                            <Label>Expiry Date</Label>
                            <Input
                                placeholder="yyyy-mm-dd"
                                name="valid_to"
                                value={formData.valid_to}
                                onChange={handleInputChange}
                                required
                            />
                        </TabsContent>
                        <TabsContent value="use">
                            <div className="flex items-center gap-2 justify-between">
                                <div>
                                    <Label>Min. Spend</Label>
                                    <Input
                                        placeholder="0"
                                        name="minimum_order_value"
                                        type="number"
                                        value={formData.minimum_order_value}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Max. Spend</Label>
                                    <Input
                                        placeholder="100"
                                        name="max_order_value"
                                        type="number"
                                        value={formData.max_order_value}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <Label>Use limit per user</Label>
                            <Input
                                placeholder="1"
                                name="use_limit_per_user"
                                type="number"
                                value={formData.use_limit_per_user}
                                onChange={handleInputChange}
                                required
                            />
                            <Label>Use limit per offer</Label>
                            <Input
                                placeholder="1"
                                name="use_limit"
                                type="number"
                                value={formData.use_limit}
                                onChange={handleInputChange}
                                required
                            />
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}