import Image, {StaticImageData} from "next/image";
import { TypographyP } from "~/utils/typography";
import { Button } from "./button";

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