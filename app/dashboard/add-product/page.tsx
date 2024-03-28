"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import ReuseableBackground from "~/components/ui/ReuseableBackground";
import ProductForm from "~/components/ui/ProductForm";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import DashboardLayout from "~/components/dashboardlayout/page";
import Listtbox from "~/components/ui/List-box";
import { FaCamera } from "react-icons/fa6";
import { randomUUID } from "crypto";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { mintyplexContractAddress } from "~/lib/utils/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import Image from "next/image";

function getProductID(): string {
  return randomUUID();
}

function getSiaURI(): string {
  return randomUUID();
}

const AddProduct: React.FC = () => {
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const mintProduct = async () => {
    const msg = {
      mint: {
        token_id: getProductID(),
        owner: account?.bech32Address,
        token_uri: getSiaURI(),
        extension: {},
      },
    };

    try {
      const mintRes = await client?.execute(
        account?.bech32Address,
        mintyplexContractAddress,
        msg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        },
        "",
        []
      );
      console.log(mintRes);
       // Show an alert of transaction hash response
    } catch (error) {
      console.log(error);
    }
  };

  // for image handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]); // Store image data

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files); // Convert FileList to Array
      const imageURLs = files.map((file) => URL.createObjectURL(file)); // Create URLs for display
      setImages((prev: string[]) => [...prev, ...imageURLs]); // Update state with new images
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev: string[]) =>
      prev.filter((_, index) => index !== indexToRemove)
    ); // Remove image by index
  };

  //

  return (
    <DashboardLayout>
      <div className="mt-10">
        <div>
          <Link href="/dashboard">
            <button className="px-3 py-2 md:hidden my-8 rounded-md font-normal text-[16px] leading-[27px]  border-brand10 border flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                  fill="#E9E9E9"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="md:text-[36px] text-[24px] leading-[46px] font-semibold">
            Add Product
          </h2>
          <div className="items-center hidden gap-2 md:flex">
            <button className="px-3  rounded-md font-normal py-2 leading-[27px] flex justify-between  text-[20px] border-[rgb(99,99,99)]  border gap-4 ">
              Cancel
              <MdCancel />
            </button>
            <div></div>
            <div>
              <Listtbox />
            </div>
            <button className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[20px] leading-[27px] hover:bg-brand2">
              Save
            </button>
            <button
              onClick={mintProduct}
              className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[20px] leading-[27px] hover:bg-brand2"
            >
              Mint
            </button>
          </div>
        </div>
        <div className="my-8 relative">
          <ReuseableBackground>
            <h1 className="px-4 text-base">
              Image <span className="text-red-600">*</span>
            </h1>
            <div className="w-full my-4">
              <div onClick={triggerFileInput} className="cursor-pointer">
                <div className="bg-[#1C1E1E]/[0.5] h-[180px] p-8 flex flex-col items-center opacity-90 justify-center">
                  <FaCamera size={24} />
                  <p className="font-light">Upload an image or drag and drop</p>
                  <p className="font-light">PNG or JPEG upto 5MB</p>
                </div>
              </div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple // Allow multiple files
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
            {/* Images collage */}
            <div className="relative mt-4 w-full justify-center flex flex-wrap gap-4 ">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index}`}
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white mt-2 mr-2 px-2 py-1 text-[10px] rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {/* Counter at the corner */}
            <div className="absolute top-0 right-0 mt-2 mr-2 text-[10px] px-3 py-2 bg-mintyplex-dark rounded-full">
              {images.length}
            </div>
          </ReuseableBackground>
        </div>
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
