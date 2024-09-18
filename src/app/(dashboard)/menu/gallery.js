import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete, Edit, ImageUp, Trash2 } from "lucide-react";
import Image from "next/image";

export default function Gallery({ n = 10 }) {
  return (
    <>
      <Button>
        <ImageUp className="mr-2 w-4 h-4" />
        Upload Image
      </Button>
      <div className="grid grid-cols-4 gap-6 mt-2">
        {Array.from({ length: n }).map((_, index) => (
          <div key={index} className="relative col-span-1 h-40 aspect-square">
            <Image
              src="/pizza.jpg"
              alt="Gallery Image"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg border-2 hover:object-scale-down"
              draggable={false}
            />
            <div className="absolute top-2 right-2 p-1 flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 rounded-full"
              >
                <Trash2 className="text-red-500 w-4 h-4" />
              </Button>
            </div>
            <p className="absolute bottom-2 left-2 text-sm font-semibold text-center drop-shadow">
              Pizza
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export function GalleryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Gallery</DialogTitle>
          <DialogDescription>Select an image to upload</DialogDescription>
        </DialogHeader>
        <Gallery />
      </DialogContent>
    </Dialog>
  );
}
