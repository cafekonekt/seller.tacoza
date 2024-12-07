// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MenuAccordion,
  AddCategory,
} from "@/app/features/menu/components/MenuAccordion";
import { AddonsAccordion } from "@/app/features/menu/components/AddonsAccordion";
import { EditForm } from "@/app/features/menu/components/EditForm";
import Gallery from "@/app/features/menu/components/Gallery";
import ErrorComponent from "@/components/ErrorComponent";
// context
import { MenuProvider } from "@/app/features/menu/context/MenuContext";
// server actions
import { getMenu } from "@/app/features/menu/server/actions/getMenu";
import { getAddons } from "@/app/features/menu/server/actions/getAddons";

export default async function Menu() {
  const itemsPromise = getMenu();
  const addonsPromise = getAddons();
  const [[itemsError, items], [addonsError, addons]] = await Promise.all([
    itemsPromise,
    addonsPromise,
  ]);
  const error = itemsError || addonsError;
  if (error) return <ErrorComponent error={error} />;

  return (
    <MenuProvider>
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 max-h-screen">
        <section className="grid grid-cols-2 h-full">
          <div className="col-span-1 p-6 overflow-y-scroll">
            <Tabs defaultValue="items">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold md:text-2xl">Menu</h1>
                <TabsList className="relative">
                  <TabsTrigger value="items">
                    Items
                    <Badge className="ml-1 flex bg-muted-foreground shrink-0 items-center justify-center rounded-full">
                      {items?.reduce(
                        (total, category) =>
                          category.sub_categories?.length > 0
                            ? total +
                              category.sub_categories.reduce(
                                (total, subCategory) =>
                                  total +
                                  Number(subCategory.food_items?.length),
                                0,
                              )
                            : total + category.food_items?.length,
                        0,
                      )}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="addons">
                    Add-ons
                    <Badge className="ml-1 flex bg-muted-foreground shrink-0 items-center justify-center rounded-full">
                      {addons?.reduce(
                        (total, addonCategory) =>
                          total + Number(addonCategory.addons?.length || 0),
                        0,
                      )}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="combo">
                    Combos
                    <Badge className="ml-1 flex bg-muted-foreground shrink-0 items-center justify-center rounded-full">
                      0
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
              <MenuAccordion categories={items} />
              <AddonsAccordion categories={addons} />
              <TabsContent value="combo">
                <AddCategory />
                <Button className="ml-2">Add Combo</Button>
              </TabsContent>
            </Tabs>
          </div>
          <EditForm foodCategory={items} addonCategory={addons} />
        </section>
      </main>
    </MenuProvider>
  );
}
