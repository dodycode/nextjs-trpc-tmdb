import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DetailsCasts } from "./casts-tab";
import { DetailsVideos } from "./videos-tab";
import { DetailsImages } from "./images-tab";

export type DetailsTabsProps = {
  type: "movie" | "tv";
  id: number;
};
const DetailsTabs: React.FC<DetailsTabsProps> = ({ type, id }) => {
  return (
    <div className="pb-8">
      <Tabs defaultValue="casts" className="w-full">
        <TabsList className="mb-6 h-14 w-full items-start justify-center gap-14 rounded-none border-b bg-transparent p-0 lg:justify-start">
          <TabsTrigger className="bg-transparent p-0 text-xl" value="casts">
            Cast & Crew
          </TabsTrigger>
          <TabsTrigger className="bg-transparent p-0 text-xl" value="videos">
            Videos
          </TabsTrigger>
          <TabsTrigger className="bg-transparent p-0 text-xl" value="images">
            Images
          </TabsTrigger>
        </TabsList>
        <DetailsCasts type={type} id={id} />
        <DetailsVideos />
        <DetailsImages />
      </Tabs>
    </div>
  );
};

export { DetailsTabs };
