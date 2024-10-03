'use client'
import { useActionState, useEffect, useState } from "react";
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

const initialSate = {
    message: null,
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
    const [state, formAction] = useActionState(createOffer, initialSate);
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        if (state.message) {
            toast({
                variant: state.status,
                title: state.message,
            });
        }
    }, [state, toast]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const useTabFields = ["minimum_order_value", "max_order_value", "use_limit_per_user", "use_limit"];
        const generalTabFields = ["coupon_code", "discount_type", "discount_value", "valid_from", "valid_to"];

        // Check if all fields in the Usage tab are filled
        let isUseTabValid = true;
        useTabFields.forEach((field) => {
            const formField = form.elements[field];
            if (!formField || !formField.value) {
                isUseTabValid = false;
            }
        });
        if (!isUseTabValid) {
            setActiveTab("use");
            toast({
                variant: "destructive",
                title: "Please fill out all required fields in the Usage tab.",
            });
            return;
        }
        // Check if all fields in the General tab are filled
        let isGeneralTabValid = true;
        generalTabFields.forEach((field) => {
            const formField = form.elements[field];
            if (!formField || !formField.value) {
                isGeneralTabValid = false;
            }
        });
        if (!isGeneralTabValid) {
            setActiveTab("general");
            toast({
                variant: "destructive",
                title: "Please fill out all required fields in the General tab.",
            });
            return;
        }
        console.log(form);
        // formAction(form);
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
                    <Input placeholder="FLAT30" name="coupon_code" required />
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="use">Usage</TabsTrigger>
                            <TabsTrigger value="product">Product</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <Label>Discount Type</Label>
                            <Select name="discount_type" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select discount type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="flat">Flat</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label>Discount Value</Label>
                            <Input placeholder="30" name="discount_value" required />
                            <Label>Valid From</Label>
                            <Input placeholder="yyyy-mm-dd" name="valid_from" value={new Date().toISOString().split('T')[0]} required />
                            <Label>Expiry Date</Label>
                            <Input placeholder="yyyy-mm-dd" name="valid_to" value={new Date().toISOString().split('T')[0]} required />
                        </TabsContent>
                        <TabsContent value="use">
                            <div className="flex items-center gap-2 justify-between">
                                <div>
                                    <Label>Min. Spend</Label>
                                    <Input placeholder="0" name="minimum_order_value" type="number" required />
                                </div>
                                <div>
                                    <Label>Max. Spend</Label>
                                    <Input placeholder="100" name="max_order_value" type="number" required />
                                </div>
                            </div>
                            <Label>Use limit per user</Label>
                            <Input placeholder="1" name="use_limit_per_user" type="number" required />
                            <Label>Use limit per offer</Label>
                            <Input placeholder="1" name="use_limit" type="number" required />
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

