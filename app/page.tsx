import Image, { StaticImageData } from "next/image";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH3, TypographyH4, TypographyP } from "~/utils/typography";

const creators = {
  image: topCreator,
  name: "Yacth Ape Club",
};

// TODO: Add a linear gradient to border

export default function Home() {
  return (
    <TooltipProvider>
      <section className="container p-3 mx-auto space-y-5">
        <TypographyH3>Top Creators</TypographyH3>
        <div className="flex p-4 overflow-auto space-x-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center w-full max-w-40 gap-1">
                  <Image
                    width={82}
                    height={82}
                    className="rounded-full"
                    draggable={false}
                    alt="user image"
                    src={creators.image}
                  />
                  <div className="overflow-hidden text-xs max-w-20 whitespace-nowrap text-ellipsis">
                    {creators.name}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p>{creators.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-mintyplex-primary/20 rounded-md">
                <ThunderBold />
              </div>
              <TypographyH4 className="whitespace-nowrap">
                Popular Products
              </TypographyH4>
            </div>
            <Button className="" size="sm" variant={"ghost"}>
              <p className="text-mintyplex-primary">See all</p>
            </Button>
          </div>
          <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {Array.from({ length: 20 }).map((_, index) => (
              <Card
                byImg={topCreator}
                name="Yatch Ape Club"
                by="0x20..8"
                image={topCreator}
                price="23"
                key={index}
              />
            ))}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Button
              className="mx-auto text-white border rounded-full linear-gradient"
              variant="ghost"
            >
              View All
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

type CardProps = {
  name: string;
  byImg: string | StaticImageData;
  by: string;
  image: string | StaticImageData;
  price: string;
};

export function Card({ name, by, image, price, byImg }: CardProps) {
  return (
    <div className="max-w-sm mx-auto rounded-lg p-1.5 space-y-2 border border-mintyplex-border">
      <div className="overflow-hidden">
        <Image
          alt={name}
          src={image}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="pb-3 border-b space-y-2 border-mintyplex-border">
        <TypographyP className="text-sm">{name}</TypographyP>
        <div>
          <small className="flex items-center gap-2">
            by{" "}
            <Image
              height={20}
              width={20}
              className="object-cover rounded-full"
              src={byImg}
              alt={by}
            />
            <span>{by}</span>
          </small>
        </div>
      </div>
      <div className="">
        <small>Price</small>
        <div>
          <small className="text-transparent !bg-clip-text font-medium [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            $ {price}
          </small>
        </div>
        <Button className="w-full active:scale-95 transition-all duration-300">
          <span className="text-white">Buy Now</span>
        </Button>
      </div>
    </div>
  );
}

function ThunderBold() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M7.65421 11.5719L10.24 8.07335C11.9115 5.81188 12.7472 4.68115 13.5269 4.9201C14.3067 5.15904 14.3067 6.54589 14.3067 9.31957V9.5811C14.3067 10.5815 14.3067 11.0817 14.6263 11.3955L14.6432 11.4117C14.9698 11.7188 15.4904 11.7188 16.5316 11.7188C18.4053 11.7188 19.3422 11.7188 19.6588 12.2871C19.6641 12.2965 19.6692 12.306 19.6741 12.3156C19.973 12.8926 19.4305 13.6265 18.3456 15.0944L15.7598 18.5929C14.0883 20.8544 13.2526 21.9851 12.4729 21.7461C11.6931 21.5072 11.6932 20.1203 11.6932 17.3466L11.6932 17.0852C11.6932 16.0848 11.6932 15.5846 11.3736 15.2708L11.3567 15.2545C11.0301 14.9474 10.5095 14.9474 9.46827 14.9474C7.59455 14.9474 6.6577 14.9474 6.34107 14.3792C6.33583 14.3697 6.33073 14.3603 6.32578 14.3507C6.02689 13.7736 6.56933 13.0397 7.65421 11.5719Z"
        fill="#1E5BDD"
      />
    </svg>
  );
}
