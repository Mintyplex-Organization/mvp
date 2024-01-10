"use client";

import React, { useState } from 'react'
import Image, { StaticImageData } from "next/image";
import { Button } from '~/components/ui/button'
import { TooltipProvider } from '~/components/ui/tooltip'
import img from "~/public/top-creator.jpeg";
import { TypographyH2, TypographyH3 } from '~/utils/typography'
import { HiTrash } from 'react-icons/hi'

export default function Cart() {

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            title: "Pay with wallet",
            content: "1",
        },
        {
            title: "Pay with card",
            content: "3",
        },
    ];

    return (
        <>
            <TooltipProvider>
                <section className="container p-3 mx-auto space-y-5">
                    <div className='space-y-8 mt-6'>
                        <div className='flex items-center justify-between'>
                            <TypographyH3>My Cart</TypographyH3>
                            <Button className="w-fit px-6 active:scale-95 transition-all duration-300">
                                <span className="text-white">Continue Shopping</span>
                            </Button>
                        </div>
                        <div className='flex flex-col lg:flex-row w-full gap-6 justify-between'>
                            <div className='w-full space-y-4 rounded-[8px] bg-[#2C2D2E]'>
                                <div className='p-[24px] w-full space-y-4'>
                                    <CartCard />
                                    <CartCard />
                                    <CartCard />
                                </div>
                                <div className="border-t border-[#757575] mt-3 p-[24px] flex-col flex gap-[12px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[20px] font-[500]">Total value</p>
                                        <p className="text-[20px] font-[500]">USD$23</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[20px] font-[500]">Transaction fee (gas)</p>
                                        <p className="text-[20px] font-[500]">USD$23</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[20px] font-[500]">Processing Fee</p>
                                        <p className="text-[20px] font-[500]">USD$23</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 bg-[#2C2D2E] bg-brand11 rounded-[8px] h-fit p-[24px] lg:w-[520px] md:w-full w-full">
                                <TypographyH3 className="text-[30px] font-[600]">Pay with</TypographyH3>
                                <div className="flex items-center w-full gap-2">
                                    {tabs.map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(index)}
                                            className={`py-[10px] px-[14px] w-full text-center font-[500] text-[14px] rounded-[10px] hover:bg-brand4  ${activeTab === index ? "bg-primary" : "bg-mintyplex-dark"
                                                }`}
                                        >
                                            {tab.title}
                                        </button>
                                    ))}
                                </div>
                                {activeTab === 0 && (
                                    <div className="flex flex-col w-full mt-4 gap-2">
                                        {/* <p></p> */}
                                        <Button className="w-full px-6 py-6 active:scale-95 transition-all duration-300">
                                            <span className="text-white">Pay Now</span>
                                        </Button>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div className="flex flex-col w-full mt-4 gap-2">
                                        {/* <p></p> */}
                                        <Button className="w-full px-6 py-6 active:scale-95 transition-all duration-300">
                                            <span className="text-white">Pay Now</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </TooltipProvider>
        </>
    )
}



function CartCard() {

    const [number, setNumber] = useState(0);

    function handleDecrease() {
        if (number > 0) {
            setNumber(number - 1);
        } else {
            setNumber(0);
        }
    }

    function handleIncrease() {
        setNumber(number + 1);
    }

    return (
        <>
            <div className="hidden md:flex bg-mintyplex-dark p-[24px] rounded-[7px] justify-between w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex items-top gap-[16px]">
                        <Image
                            src={img}
                            alt=""
                            width={125}
                            height={125}
                            className="object-cover rounded-[8px]"
                        />
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-[20px] font-[500] font-[600]">Bored Ape Yatch</p>
                                <p className="text-[16px] font-[400]">Sadistar</p>
                                <p className="text-[14px] font-[400]">Membership: Monthly</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <HiTrash size={30} />
                        <p className="text-primary">Remove</p>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <h1 className="text-[26px] font-[700]">USD$23</h1>
                    <div className="flex gap-[10px] items-center">
                        <button
                            className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-[10px] hover:bg-primary"
                            onClick={handleDecrease}
                        >
                            -
                        </button>
                        <div className="text-[20px] font-[500] flex items-center justify-center w-[20px] font-[600]">{number}</div>
                        <button
                            className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-[10px] hover:bg-primary"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
