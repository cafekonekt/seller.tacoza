"use client";
// lib
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// hooks
import { useToast } from "@/hooks/use-toast";
// server actions
import { createArea } from "@/app/features/table/server/actions/createArea";
// schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(20),
});

export function AddArea() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit() {
    const [error, response] = await createArea(form.getValues());
    if (error) {
      return toast({
        variant: "destructive",
        title: "Error creating area",
      });
    } else {
      toast({
        variant: "success",
        title: "Area created successfully",
      });
    }
  }

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Area name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-3">
                Add
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
