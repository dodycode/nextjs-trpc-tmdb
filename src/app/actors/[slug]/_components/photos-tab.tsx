import { TabsContent } from "~/components/ui/tabs";

const DetailsPhotos: React.FC = () => {
  return (
    <TabsContent value="photos">
      <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-6">
        {/* Coming soon */}
      </div>
    </TabsContent>
  );
};

export { DetailsPhotos };
