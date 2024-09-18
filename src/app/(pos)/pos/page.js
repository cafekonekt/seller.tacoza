import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bike, Package, UtensilsCrossed } from "lucide-react";

export default function TableSelect() {
  return (
    <main className="h-screen w-screen">
      <Options className="mt-10" />
      <Tabs defaultValue="main">
        <div className="p-8 flex justify-center w-full h-full">
          <TabsList className="fixed bottom-10">
            <TabsTrigger value="main">Main Floor</TabsTrigger>
            <TabsTrigger value="2ndfloor">2nd Floor</TabsTrigger>
            <TabsTrigger value="roof">Rooftop</TabsTrigger>
            <TabsTrigger value="out">Outside</TabsTrigger>
          </TabsList>
          <TabsContent value="main">
            <section className="grid grid-cols-3 gap-10">
              <div className="w-40 h-40 bg-muted rounded-2xl grid items-center justify-center font-bold shadow-inner">
                T1
              </div>
              <div className="w-40 h-40 bg-green-300 rounded-2xl grid items-center justify-center font-bold shadow-inner">
                T2
              </div>
              <div className="w-40 h-40 bg-muted rounded-2xl grid items-center justify-center font-bold shadow-inner">
                T3
              </div>
            </section>
          </TabsContent>
          <TabsContent value="takeaway">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </main>
  );
}

export function Options() {
  return (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <UtensilsCrossed className="w-3.5 h-3.5 mr-1" />
        DineIn
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Package className="w-3.5 h-3.5 mr-1" />
        Takeaway
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Bike className="w-3.5 h-3.5 mr-1" />
        Delivery
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
