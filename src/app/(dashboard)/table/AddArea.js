'use client'
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createArea } from "@/lib/table/createArea";
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

export function AddArea() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(createArea, initialSate);

    useEffect(() => {
        if (state.message) {
            toast({
                variant: state.status,
                title: state.message,
            });
        }
    }, [state, toast]);


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Add Area</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-[6.5vh]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Add Area</h4>
                        <p className="text-sm text-muted-foreground">
                            Areas where tables are placed.
                        </p>
                    </div>

                    <form action={formAction}>
                        <Label htmlFor="width">Name</Label>
                        <Input
                            id="width"
                            name="name"
                            placeholder="Area name"
                            className="col-span-2 h-8"
                            required
                        />
                        <SubmitButton />
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
}
