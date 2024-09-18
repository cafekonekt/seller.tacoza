"use client"
import { useState, useEffect, useRef, startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { deleteTableWithDelay } from "@/lib/table/deleteTable";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";

export function DeleteTable({ tableId }) {
    const { toast } = useToast();
    const timeoutIdRef = useRef(null);
    const isDeletingRef = useRef(false); // Use a ref to track the `isDeleting` state
    const [isDeleting, setIsDeleting] = useState(false);
    const [state, formAction] = useActionState(deleteTableWithDelay, { 
        message: null
    });

    const handleDelete = () => {
        // Show toast immediately and start deletion countdown
        setIsDeleting(true);
        isDeletingRef.current = true; // Set the ref value immediately

        toast({
            title: "Table will be deleted",
            description: "You can undo this action within 5 seconds.",
            action: (
                <ToastAction
                    altText="Undo"
                    onClick={() => {
                        clearTimeout(timeoutIdRef.current); // Cancel deletion
                        setIsDeleting(false);
                        isDeletingRef.current = false; // Update the ref value
                        toast({
                            variant: 'success',
                            title: "Deletion Undone",
                        });
                    }}
                >
                    Undo
                </ToastAction>
            ),
        });

        // Use `startTransition` for deferred UI update
        timeoutIdRef.current = setTimeout(() => {
            if (isDeletingRef.current) {
                startTransition(() => {
                    formAction(tableId); // Dispatch the action inside `startTransition`
                });
            }
        }, 5000);
    };

    useEffect(() => {
        if (state.message) {
            toast({
                variant: state.status,
                title: state.message,
            });
        }
        setIsDeleting(false); // Reset the `isDeleting` state after deletion
        // Clean up timeout when component unmounts or if action is undone
        return () => clearTimeout(timeoutIdRef.current);
    }, [state, toast]);

    return (
        <Button onClick={handleDelete} disabled={isDeleting}>
            <Trash />
        </Button>
    );
}
