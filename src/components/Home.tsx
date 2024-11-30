'use client';

import React, { useState } from 'react';
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Spotlight } from "./ui/spotlight";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Router from next/navigation

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
  ];

  // Handle search query changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }

    // Redirect to the search page with the query as a URL parameter
    router.push(`/onlinebook?query=${encodeURIComponent(searchQuery)}`); // or router.replace()
  };

  return (
    <div className="h-full w-full overflow-hidden min-h-screen mt-[13rem] items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <p className="text-center mt-[22rem] mb-10 sm:mb-20 text-xl sm:text-3xl dark:text-white text-black">
        Welcome to E-lib, your ultimate e-library destination!
      </p>

      {/* Search Bar */}
      <div className="items-center w-full justify-center px-4">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={searchQuery}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      {/* Decorative Image */}
      <div className="flex flex-col justify-center items-center -mt-12">
        <Image
          className="-mt-6"
          src="/images/Open-book.png"
          width={500}
          height={200}
          alt="Open Book"
        />
      </div>
    </div>
  );
}
