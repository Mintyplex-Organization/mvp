"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Curator from '~/public/curator.png'
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { FaCamera } from "react-icons/fa6";

type ModalProps = {
  setEditModal?: any;
};

export default function EditModal({ setEditModal }: ModalProps) {

  const [imageSrc, setImageSrc] = useState<any>(Curator);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-bg-dark/[0.65] fixed inset-0 z-[9999] backdrop-blur-[10px] px-4 overflow-auto">
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="bg-[#313233] rounded-[8px] !max-w-[800px] px-4 md:px-8 py-6 md:py-10">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {/* Close Button */}
            <div
              className="cursor-pointer w-full flex justify-end"
              onClick={() => setEditModal(false)}
            >
              <AiOutlineCloseCircle size={30} />
            </div>
            <h2 className="font-[500] text-[32px]">Edit Bio</h2>
            <p className="text-center text-[13px] font-[400]">
              Your logo will be visible next to your name in your Mintyplex
              profile and product pages.{" "}
            </p>

            {/* Image Upload Section */}
            <div className="my-4 relative">
              <div onClick={triggerFileInput} className="cursor-pointer">
                <div className="absolute bg-[#1C1E1E]/[0.5] rounded-full inset-0 grid items-center opacity-90 justify-center">
                  <FaCamera />
                </div>
                <Image
                  src={imageSrc}
                  width={120}
                  height={120}
                  alt="Curator"
                  className="rounded-full border-[8px] border-mintyplex-dark"
                  style={{ height: '120px', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
            <form className="flex flex-col gap-3 w-full">
              <div className="form">
                <textarea
                  name=""
                  placeholder="Provide a well detailed description of the item."
                  className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] text-[13px] placeholder:text-[14px] bg-none outline-none  w-full "
                  id=""
                  rows={4}
                ></textarea>
                <label htmlFor="" className="px-4 text-sm">
                  Bio
                </label>
              </div>
              <div className="form">
                <input
                  type="text"
                  className="px-4 py-6 border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                  placeholder="https://www.x.com/username"
                  required
                />
                <label htmlFor="" className="px-4 text-sm">
                  X(Twitter) link <span className="text-red-600">*</span>
                </label>
              </div>
            </form>
            <div className="w-full flex justify-end mt-4">
              <Button className="text-white bg-mintyplex-primary">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
