"use client";

import { Abstraxion } from "@burnt-labs/abstraxion";
import Image from "next/image";
import Link from "next/link";
import { BsXLg } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { useAccount } from "~/components/context/AccountContext";
import MobileSidebar from "~/components/dashboardlayout/mobileSidebar";
import Search from "~/components/ui/Search";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import logoLg from "~/public/logo-lg.png";
import logo from "~/public/logo.png";
import { truncate } from "~/utils/truncate";
import { TypographyH3 } from "~/utils/typography";

export default function Navbar() {
  const {
    closeSidebar,
    isSidebarOpen,
    isLoggedIn,
    account,
    setShowAbstraxion,
    toggleSidebar,
  } = useAccount();

  return (
    <header className="border-b border-mintyplex-border">
      <nav className="container flex items-center justify-between p-3 mx-auto">
        <Link href="/">
          <div className="flex items-center gap-1">
            <Image
              className="hidden md:block"
              quality="100"
              alt="Mintyplex Logo"
              src={logoLg}
              height={28}
              fetchPriority="high"
              priority
            />
            <Image
              className="md:hidden"
              alt="Mintyplex Logo"
              src={logo}
              height={30}
              fetchPriority="high"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="items-center w-[300px] px-3 mx-auto overflow-hidden border border-white rounded-[8px] hidden md:flex gap-3 focus-within:border-brand1 transition-all duration-300">
            <Search />
            <input
              type="search"
              name="search"
              className="w-full py-3 text-sm bg-transparent outline-none bg-opacity-0 focus:outline-none"
              placeholder="Search product"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <SearchIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <TypographyH3>Search Mintyplex</TypographyH3>
              <Input placeholder="Search for Creators, Products and Categories" />
              <Button className="flex items-center justify-center gap-3 transition-all duration-300 bg-mintyplex-primary">
                <SearchIcon /> <span className="text-[#E9E9E9]">Search</span>
              </Button>
            </DialogContent>
          </Dialog>
          <Link href="/cart">
            <Button
              variant="ghost"
              className="border border-mintyplex-border"
              size="icon"
            >
              <CartIcon />
            </Button>
          </Link>
          <div className="hidden md:block">
            <div className="hidden md:block">
              {account.bech32Address ? (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-fit px-4 py-5 gap-2 border border-mintyplex-border"
                        size="icon"
                      >
                        <HiUserCircle size={24} />
                        {truncate(account.bech32Address)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-3 w-[144px] border-mintyplex-border bg-mintyplex-dark">
                      <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-red"
                        onClick={() => setShowAbstraxion(true)}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <button
                  onClick={() => setShowAbstraxion(true)}
                  className="rounded-[8px] text-[14px] px-5 py-2 bg-mintyplex-primary hover:bg-mintyplex-border"
                >
                  Login{" "}
                </button>
              )}
              <Abstraxion
                onClose={() => {
                  setShowAbstraxion(false);
                }}
              />
            </div>
          </div>
          <Button
            className="block md:hidden"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Hamburger />
          </Button>
        </div>
      </nav>
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 bg-mintyplex-dark w-full z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "" : "-translate-x-full"}`}
      >
        <div
          className="flex justify-end w-full mb-[50px] px-6 py-3 z-[11111]"
          onClick={closeSidebar}
        >
          <p className="p-2 border rounded-full">
            <BsXLg />
          </p>
        </div>
        <div className="w-full mt-4">
          <MobileSidebar
            setShowAbstraxion={setShowAbstraxion}
            closeSidebar={closeSidebar}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M14.5 25C20.299 25 25 20.299 25 14.5C25 8.70101 20.299 4 14.5 4C8.70101 4 4 8.70101 4 14.5C4 20.299 8.70101 25 14.5 25Z"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9253 21.9253L28.0003 28.0003"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M8.5 21.75C9.32843 21.75 10 21.0784 10 20.25C10 19.4216 9.32843 18.75 8.5 18.75C7.67157 18.75 7 19.4216 7 20.25C7 21.0784 7.67157 21.75 8.5 21.75Z"
        fill="#E9E9E9"
      />
      <path
        d="M18.25 21.75C19.0784 21.75 19.75 21.0784 19.75 20.25C19.75 19.4216 19.0784 18.75 18.25 18.75C17.4216 18.75 16.75 19.4216 16.75 20.25C16.75 21.0784 17.4216 21.75 18.25 21.75Z"
        fill="#E9E9E9"
      />
      <path
        d="M4.96563 6.75H21.7844L19.3094 15.4125C19.2211 15.7269 19.032 16.0036 18.7711 16.2C18.5103 16.3965 18.1922 16.5019 17.8656 16.5H8.88438C8.55783 16.5019 8.2397 16.3965 7.97887 16.2C7.71803 16.0036 7.52893 15.7269 7.44063 15.4125L4.04688 3.54375C4.00203 3.38696 3.9073 3.24905 3.77704 3.15093C3.64677 3.05282 3.48808 2.99983 3.325 3H1.75"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Hamburger() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M5.33333 24C4.95556 24 4.63911 23.872 4.384 23.616C4.128 23.3609 4 23.0444 4 22.6667C4 22.2889 4.128 21.9724 4.384 21.7173C4.63911 21.4613 4.95556 21.3333 5.33333 21.3333H26.6667C27.0444 21.3333 27.3609 21.4613 27.616 21.7173C27.872 21.9724 28 22.2889 28 22.6667C28 23.0444 27.872 23.3609 27.616 23.616C27.3609 23.872 27.0444 24 26.6667 24H5.33333ZM5.33333 17.3333C4.95556 17.3333 4.63911 17.2053 4.384 16.9493C4.128 16.6942 4 16.3778 4 16C4 15.6222 4.128 15.3053 4.384 15.0493C4.63911 14.7942 4.95556 14.6667 5.33333 14.6667H26.6667C27.0444 14.6667 27.3609 14.7942 27.616 15.0493C27.872 15.3053 28 15.6222 28 16C28 16.3778 27.872 16.6942 27.616 16.9493C27.3609 17.2053 27.0444 17.3333 26.6667 17.3333H5.33333ZM5.33333 10.6667C4.95556 10.6667 4.63911 10.5391 4.384 10.284C4.128 10.028 4 9.71111 4 9.33333C4 8.95556 4.128 8.63867 4.384 8.38267C4.63911 8.12756 4.95556 8 5.33333 8H26.6667C27.0444 8 27.3609 8.12756 27.616 8.38267C27.872 8.63867 28 8.95556 28 9.33333C28 9.71111 27.872 10.028 27.616 10.284C27.3609 10.5391 27.0444 10.6667 26.6667 10.6667H5.33333Z"
        fill="#E6E6E7"
      />
    </svg>
  );
}
