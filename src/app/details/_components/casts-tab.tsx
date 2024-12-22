import { TabsContent } from "~/components/ui/tabs";

import CastOne from "~/app/_assets/dummies/cast-1.jpg";
import CastTwo from "~/app/_assets/dummies/cast-2.jpg";
import CastThree from "~/app/_assets/dummies/cast-3.jpg";
import CastFour from "~/app/_assets/dummies/cast-4.jpg";
import CastFive from "~/app/_assets/dummies/cast-5.jpg";
import type { StaticImageData } from "next/image";
import NextAvatar from "~/components/next-avatar";

const castImgs = [CastOne, CastTwo, CastThree, CastFour, CastFive];

const Cast: React.FC<{ alt: string; src: StaticImageData }> = ({
  alt,
  src,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-none flex-col items-center gap-6">
        <NextAvatar
          src={src}
          alt={alt}
          className="object-cover"
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-2">
          <span className="font-bold">Shadcn</span>
          <span className="text-sm text-muted-foreground">Creator</span>
        </div>
      </div>
    </div>
  );
};

const DetailsCasts: React.FC = () => {
  return (
    <TabsContent value="casts">
      <div className="flex flex-wrap items-center justify-center gap-10 py-8 lg:justify-start">
        {castImgs.map((img) => (
          <Cast key={img.src} src={img} alt="cast" />
        ))}
      </div>
    </TabsContent>
  );
};

export { DetailsCasts };
