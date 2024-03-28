"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import { HiLogout, HiUserCircle } from "react-icons/hi";
import { GoCopy, GoHomeFill } from "react-icons/go";
import { Button } from "../ui/button";
import curator from "~/public/curator.png";
import { FaFacebookF } from "react-icons/fa6";
import TwitterIcon from "../ui/TwitterIcon";
import TelegramIcon from "../ui/TelegramIcon";
import { useAbstraxionAccount, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { truncateXionAddress } from "~/lib/utils/utils";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ReserveUsername from "../customs/ReserveUsername";



export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GoHomeFill size={25} />,
    link: "/dashboard",
    id: "dashboard",
  },
  {
    title: "Profile",
    icon: <HiUserCircle size={25} />,
    link: "/creator/32",
    id: "profile",
  },
];

const links = [
  {
    Icon: TwitterIcon,
    href: "https://twitter.com/Mintyplex",
  },
  {
    Icon: FaFacebookF,
    href: "https://www.facebook.com/mintyplex",
  },
  {
    Icon: TelegramIcon,
    href: "https://t.me/mintyplex",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const { toast } = useToast()

  // handle copy notification
  const handleCopy = (text: string | null) => {
    toast({
      description: "Address copied.",
    })
  };

  return (
    <main className="sticky w-[240px] top-0 flex-col hidden h-screen p-6 lg:flex gap-6 bg-[#2C2D2E]">
      <div className="flex flex-col items-center justify-center mx-auto gap-4">
        <Image
          src={curator}
          width={120}
          height={120}
          alt="curator image"
          className="rounded-full border-[8px] border-mintyplex-dark"
        />
        <div className="text-center">
          <div className="flex items-center gap-2">
          <p className="text-[25px] font-bold capitalize">{truncateXionAddress(account.bech32Address)}</p>
            <div className="cursor-pointer" onClick={() => copyToClipboard(`${account.bech32Address}`, handleCopy)}>
              <GoCopy />
            </div>
          </div>
          <p className="text-[16px] !underline text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Alpha Version
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="!bg-mintyplex-primary text-white flex justify-between items-center px-4 w-full py-6 rounded-[8px] font-semibold text-[16px]">
            <p>Reserve Username</p>
            <BsArrowUpRight />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ReserveUsername />
        </DialogContent>
      </Dialog>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex flex-col gap-2">
          {SidebarData.map((data, i) => (
            <div key={i}>
              <Link href={data.link}>
                <div
                  className={`text-center cursor-pointer w-full flex items-center gap-4 py-2 px-4 transition-colors rounded-[8px] hover:bg-mintyplex-primary ${pathname === data.id ? "bg-mintyplex-primary" : ""
                    }`}
                >
                  {data.icon}
                  <div>
                    <p>{data.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-col items-center justify-center w-full pb-4 border-b gap-3 border-mintyplex-border">
            <Link href="https://discord.gg/2qeDehj4De">
              <h2>Request a Feature</h2>
            </Link>
            <div className="flex items-center gap-3">
              {links.map(({ Icon, href }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="p-2 border rounded-full transition-all duration-300 hover:bg-mintyplex-primary border-mintyplex-border/50"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`flex items-center w-full py-3 text-center cursor-pointer gap-4 transition-colors rounded-[8px] hover:bg-brand1`}
          >
            <HiLogout />
            <div>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
