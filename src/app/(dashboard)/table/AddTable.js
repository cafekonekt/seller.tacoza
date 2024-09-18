"use client";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { createTable } from "@/lib/table/createTable";
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

export function AddTable({ areas }) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createTable, initialSate);

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
        <Button>Add Table</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-[6.5vh]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Table</h4>
            <p className="text-sm text-muted-foreground">
              Select area and add table.
            </p>
          </div>

          <form action={formAction}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Table name"
              className="col-span-2 h-8"
            />
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="Capacity"
              className="col-span-2 h-8"
            />
            <Label htmlFor="area">Area</Label>
            <Select id="area" name="area">
              <SelectTrigger>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <SubmitButton />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
