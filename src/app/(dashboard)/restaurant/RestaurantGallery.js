import {
    CloudUpload,
    Edit,
  } from "lucide-react";

  import { Label } from "@/components/ui/label";
  import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function Gallery({ n = 4 }) {
    return (
        <div className="flex flex-col w-full gap-3">
            <p className="font-bold mb-2">Outlet Images</p>
            <Label htmlFor="dropzone-file">Logo</Label>
            <div className="flex items-center">
                <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center aspect-square h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUpload className="text-gray-500 dark:text-gray-400" size={32} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Upload your logo</span>
                            <br /> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            (MAX. 400x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <Label htmlFor="dropzone-file">Restaurant Images</Label>
            <div className="grid grid-cols-4 w-full gap-3">
                {Array.from({ length: n }).map((_, index) => (
                    <label
                        key={index}
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                ))}
            </div>
        </div>
    );
}

export function RestaurantGallery() {
    return (
        <TabsContent value="hour">
            <Card className="p-8">
                <Gallery />
            </Card>
        </TabsContent>
    )
}