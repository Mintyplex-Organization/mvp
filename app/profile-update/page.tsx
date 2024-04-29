"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Curator from "~/public/curator.png";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { useAccount } from "~/components/context/AccountContext";
import { truncate } from "~/utils/truncate";
import usePostData from "~/hooks/usePostData";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useFetchUserData from "~/hooks/useFetchData";
import { useToast } from "~/components/ui/use-toast";

interface FormData {
  bio: string;
  email: string;
  wallet_address: string;
  x_link: string;
}

export default function UpdateProfile() {
  const { account, accountData, isLoggedIn } = useAccount();
  const { userData } = useFetchUserData({ isLoggedIn, accountData });
  const router = useRouter();

  // Image scr
  const [imageSrc, setImageSrc] = useState<any>(Curator);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (userData) {
    router.push("/dashboard");
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImageFile(file);

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

  const { toast } = useToast();

  const handleSuccessful = () => {
    toast({
      description: "Profile Completed.",
    });
  };
  const handleError = () => {
    toast({
      description: "Error uploading image (try an image with less than 1mb).",
    });
  };

  // data

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { postData, isLoading, error } = usePostData();

  const onSubmit = async (data: any) => {
    // preventDefault();
    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";
    // const apiUrl = process.env.NEXT_BASE_URL;

    data.wallet_address = account.bech32Address;

    const response = await postData({
      url: `${apiUrl}/profile`,
      body: data,
    });
    if (response) {
      handleSuccessful();
      router.push("/dashboard");
      console.log("Form submitted successfully:", response);
    }
  };

  // On submit Image
  const onSubmitImage = async () => {
    // preventDefault(); // Remove this line as it's not needed in this context
    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", imageFile);

    try {
      const response = await fetch(`${apiUrl}/avatar/${accountData}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleSuccessful();
        console.log("Image uploaded successfully");
        router.push("/dashboard");
      } else {
        handleError();
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmitAll = async () => {
    await onSubmit({});
    await onSubmitImage();
  };

  return (
    <div>
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="bg-[#313233] rounded-[8px] !max-w-[800px] px-4 md:px-8 py-6 md:py-10">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h2 className="font-[500] text-[32px]">Complete profile</h2>
            <p className="text-center text-[13px] font-[400]">
              Your profile image will be visible next to your name in your
              Mintyplex profile and product pages.{" "}
            </p>

            {/* Image Upload Section */}
            <form
              onSubmit={handleSubmit(onSubmitImage)}
              className="my-2 relative"
            >
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
                  style={{
                    height: "120px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
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
            </form>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
              <div className="w-full py-2 px-4 flex justify-center">
                <h3>{truncate(account.bech32Address)}</h3>
              </div>
              <div className="form">
                <p className="mb-2 text-[14px]">
                  Bio <span className="text-red-600">*</span>
                </p>
                <textarea
                  // name="bio"
                  placeholder="Provide a well detailed description of the item."
                  className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] text-[13px] placeholder:text-[14px] outline-none  w-full "
                  id=""
                  rows={4}
                  {...register("bio", { required: true })}
                ></textarea>
              </div>
              <div className="form">
                <p className="mb-2 text-[14px]">
                  X(Twitter) link <span className="text-red-600">*</span>
                </p>
                <input
                  type="url"
                  // name="x_link"
                  className="p-4 bg-none border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                  placeholder="https://www.x.com/username"
                  required
                  {...register("x_link", { required: true })}
                />
              </div>
            </form>
            <div className="w-full flex justify-end mt-4">
              <button
                onClick={handleSubmitAll}
                // disabled={isLoading}
                className="text-white bg-mintyplex-primary px-3 py-2 rounded-[8px]"
              >
                {isLoading ? (
                  <>
                    <div className="loader"></div>
                  </>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </div>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}
