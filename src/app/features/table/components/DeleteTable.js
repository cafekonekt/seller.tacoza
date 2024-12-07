"use client";
import { useState } from "react";
// components
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
// hooks
import { useToast } from "@/hooks/use-toast";
// server actions
import { deleteTable } from "@/app/features/table/server/actions/deleteTable";

export function DeleteTable({ tableId }) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false); // Add state for deletion status

  const handleDelete = () => {
    setIsDeleting(true); // Set deleting state to true
    const timeoutIdRef = { current: null };
    // Show toast immediately and start deletion countdown
    toast({
      title: "Table will be deleted",
      description: "You can undo this action within 5 seconds.",
      action: (
        <ToastAction
          altText="Undo"
          onClick={() => {
            clearTimeout(timeoutIdRef.current);
            setIsDeleting(false); // Reset deleting state
            toast({
              variant: "success",
              title: "Deletion Undone",
            });
          }}
        >
          Undo
        </ToastAction>
      ),
    });
    // Set timeout for deletion
    timeoutIdRef.current = setTimeout(async () => {
      const [error, response] = await deleteTable(tableId);
      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting table",
        });
      }
      setIsDeleting(false); // Reset deleting state after deletion
    }, 5000);
  };

  return (
    <Button onClick={handleDelete} disabled={isDeleting}>
      <Trash />
    </Button>
  );
}
