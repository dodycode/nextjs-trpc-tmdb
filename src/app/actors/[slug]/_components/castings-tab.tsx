import { TabsContent } from "~/components/ui/tabs";
import { Movies } from "~/app/_components/discover-shows";

const DetailsCastings: React.FC = () => {
  return (
    <TabsContent value="castings">
      <Movies />
    </TabsContent>
  );
};

export { DetailsCastings };
