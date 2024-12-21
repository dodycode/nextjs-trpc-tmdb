import { MovieCard } from "~/components/movie-card";
import { TabsContent } from "~/components/ui/tabs";
import DummyImg from "~/app/_assets/dummies/actor-6.jpg";

const DetailsPhotos: React.FC = () => {
  return (
    <TabsContent value="photos">
      <div className="grid grid-cols-2 items-stretch gap-2 md:grid-cols-4 lg:grid-cols-6">
        <MovieCard
          src={DummyImg}
          alt="movie"
          key={DummyImg.src}
          imgClassName="object-top"
        />
      </div>
    </TabsContent>
  );
};

export { DetailsPhotos };
