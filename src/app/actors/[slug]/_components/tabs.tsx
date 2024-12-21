import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DetailsPhotos } from "./photos-tab";
import { DetailsCastings } from "./castings-tab";

const DetailsTabs: React.FC = () => {
  return (
    <div className="px-4 pb-8 lg:pr-20">
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="mb-6 h-14 w-full items-start justify-center gap-14 rounded-none border-b bg-transparent p-0 lg:justify-start">
          <TabsTrigger className="bg-transparent p-0 text-xl" value="photos">
            Photos
          </TabsTrigger>
          <TabsTrigger className="bg-transparent p-0 text-xl" value="castings">
            Castings
          </TabsTrigger>
        </TabsList>
        <DetailsPhotos />
        <DetailsCastings />
      </Tabs>
    </div>
  );
};

export { DetailsTabs };
