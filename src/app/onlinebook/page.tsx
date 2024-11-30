'use client';

import { CardDemo } from "@/components/Card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Correct hook for query parameters

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  publishYear?: string;
  pdfPath: string; // Assuming this will be included for download
}

const Page = () => {
  const searchParams = useSearchParams(); // Hook to get query parameters
  const query = searchParams.get("query"); // Access the 'query' parameter
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (query) {
      const fetchBooks = async () => {
        try {
          const response = await fetch(`/api/searchBook/${encodeURIComponent(query)}`);
          if (response.status === 200) {
            const data = await response.json();
            setBooks(data.data); // Assuming the returned data is in { data: [] } format
          } else {
            console.error("Error fetching books:", response.statusText);
          }
        } catch (err) {
          console.error("Error fetching books:", err);
        }
      };

      fetchBooks();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Card */}
        <div className="flex justify-center md:justify-start">
          {books.length > 0 ? (
            <CardDemo book={books[0]} />
          ) : (
            <p>Loading book details...</p>
          )}
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center space-y-4">
          {books.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold">{books[0].title}</h2>
              <p className="text-lg text-gray-300">
                <span className="font-semibold">Author:</span> {books[0].author}
              </p>
              <p className="text-lg text-gray-300">
                <span className="font-semibold">Summary:</span> {books[0].description || 'No description available'}
              </p>
              {books[0].publishYear && (
                <p className="text-lg text-gray-300">
                  <span className="font-semibold">Published:</span> {books[0].publishYear}
                </p>
              )}
              <a
                href={books[0].pdfPath} // Assuming the pdfPath points to the downloadable file
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                  Download
                </button>
              </a>
            </>
          ) : (
            <p>No book found for the query: {query}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
