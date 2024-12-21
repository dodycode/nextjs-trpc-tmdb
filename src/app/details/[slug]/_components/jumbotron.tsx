"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

import DummyImg from "../../../_assets/dummies/jumbotron.jpg";
import DummyLogo from "../../../_assets/dummies/jumbotron-logo.png";
import { DotSeparator } from "~/components/dot-separator";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/icons";
import { buildThresholdList } from "~/lib/utils";

const Metadata: React.FC = () => {
  return (
    <div className="group flex items-baseline gap-3 text-base">
      <span className="font-bold">2022</span>
      <DotSeparator />
      <span>TV Series</span>
      <DotSeparator />
      <span>16 episodes</span>
    </div>
  );
};

const JumbotronContent: React.FC = () => {
  return (
    <div className="relative flex h-full w-full flex-col justify-end gap-4 px-4 pb-10 lg:max-w-[30vw]">
      <Image src={DummyLogo} alt="Dummy Logo" />
      <Metadata />
      <div className="min-h-6">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
          quidem est aliquid adipisci sint nesciunt maxime laboriosam.
        </p>
      </div>
      <span className="font-bold">Mystery</span>
      <div className="flex items-stretch gap-4">
        <Button
          variant="secondary"
          className="bg-disney-secondary hover:bg-disney-secondary flex h-14 flex-grow items-center rounded-lg text-lg text-[#0f1014] transition-all hover:scale-95"
        >
          <Icon type="play" />
          Watch Trailer
        </Button>
        <Button variant="secondary" className="size-14 flex-none">
          <Icon type="plus" />
        </Button>
      </div>
    </div>
  );
};

const Backdrop: React.FC = () => {
  return (
    <>
      <div className="bg-disney-details-gradient" />
      <div className="bg-disney-details-bottom-gradient" />
    </>
  );
};

const Jumbotron: React.FC = () => {
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  // change background image opacity on scroll
  useEffect(() => {
    if (!bgImageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elem = entry.target as HTMLImageElement;
          if (elem) {
            // Get the original intersection ratio
            const originalRatio = entry.intersectionRatio;

            // Apply a more aggressive function to decrease the ratio quickly
            const adjustedRatio = Math.pow(originalRatio, 3);

            // Set the opacity using the adjusted ratio
            elem.style.opacity = adjustedRatio.toString();
          }
        });
      },
      {
        root: null,
        threshold: buildThresholdList(),
      },
    );

    observer.observe(bgImageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Image
        ref={bgImageRef}
        src={DummyImg}
        alt="Dummy Image"
        className="object-cover object-center"
        quality={100}
        fill
      />
      <Backdrop />
      <JumbotronContent />
    </div>
  );
};

export { Jumbotron };
