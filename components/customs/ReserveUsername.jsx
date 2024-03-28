"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from "../ui/use-toast";
import { TypographyH3 } from "../../utils/typography";
import { Input } from "../ui/input";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";


// type ReserveUsernameProps = {
//     setEditModal?: any;
//     response?: any;
// };

export default function ReserveUsername() {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const tweetText = "Just secured a unique @Mintyplex username! 🚀 The top 100 to join before launch will receive exclusive value-added benefits for free. 🎁 Reserve your own username now: https://www.mintyplex.com";
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;



    async function onSubmit(data) {
        // Check if email and username are not empty
        if (!data.email || !data.username) {
            // Display an error message using your existing toast notification system
            toast({
                title: 'Submission Failed',
                description: 'Email and username are required.',
            });
            return; // Stop the function execution if validation fails
        }

        try {
            setLoading(true);

            const updatedData = {
                ...data,
                username: `${data.username}.mtpx`, // Customize the username as needed
            };

            console.log(updatedData, 'Successful');
            // axios.post('/api/waitlist', updatedData, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            const res = await fetch(`/api/waitlist`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ updatedData }),
              })

            console.log(res, 'response');

            reset(); // Reset the form state

            // Display a success message
            const message = `Your username ${updatedData.username} has been reserved!`;
            // Call your method to show the success message, e.g., onOpen(true), or another toast
            toast({
                title: 'Success',
                description: message,
                status: 'success', // Assuming your toast system supports status or type of messages
                duration: 9000,
                isClosable: true,
            });

        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'An unknown error occurred';
            // Display an error message
            toast({
                title: 'Waitlist Failed',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full my-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <AiOutlineMail size={25} />
                <Input type='email' placeholder="Email address" {...register('email')} />
            </div>
            <div className="flex items-center gap-4">
                <AiOutlineUser size={25} />
                <div className="flex gap-2 w-full">
                    <Input type='text' placeholder="Enter a unique username" {...register('username')} />
                    <div className="grid place-items-center text-[12px] rounded-[5px] px-2 py-1 bg-mintyplex-dark">
                        <span>.mtpx</span>
                    </div>
                </div>
            </div>
            <Button className="!bg-mintyplex-primary text-white" type='submit'>
                {
                    loading ? (
                        <FaSpinner />
                    ) : (
                        <h3>Reserve Now</h3>
                    )
                }
            </Button>
        </form>
    );
}


