'use client'

import React from 'react'
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import Book from "../../public/images/Book.jpg";
import Image from 'next/image'
const Home = () => {
  const placeholders = [
    "Search for your favorite books...",
    "Looking for the latest bestsellers?",
    "Find books by your favorite authors...",
    "Discover books on machine learning or design...",
    "What will you read next?",
    "Explore classic literature and timeless stories...",
    "Find guides and tutorials for your projects...",
    "Looking for a gripping mystery or thriller?",
    "Search by genre, title, or author...",
    "Need recommendations for self-help books?",
    "Find textbooks for your next semester...",
    "Explore science fiction and fantasy adventures..."
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className='h-full w-full overflow-hidden min-h-screen mt-[22rem] items-center justify-center'>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <p className='text-center mt-[22rem] mb-10 sm:mb-20 text-xl sm:text-3xl dark:text-white text-black'>Welcome to E-lib, your ultimate e-library destination!.</p>

      <div className='items-center w-full justify-center px-4 '>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="flex flex-col justify-center items-center ">
      <Image
      className="-mt-6"
      src="/images/Open-book.png"
      width={500}
      height={200}
      alt="Picture of the author"
    />
      </div>
      
      
    </div>
  )
}

export default Home
