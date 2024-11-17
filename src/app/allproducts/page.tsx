"use client";

import { useState } from "react";
import Image from "next/image";

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
};

const books: Book[] = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/images/great-gatsby.jpg", price: 10 },
  { id: 2, title: "1984", author: "George Orwell", image: "/images/1984.jpg", price: 15 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/images/to-kill-a-mockingbird.jpg", price: 12 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image: "/images/pride-and-prejudice.jpg", price: 8 },
  { id: 5, title: "Moby Dick", author: "Herman Melville", image: "/images/moby-dick.jpg", price: 18 },
  { id: 6, title: "War and Peace", author: "Leo Tolstoy", image: "/images/war-and-peace.jpg", price: 20 },
  // Add more books as needed
];

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filter, setFilter] = useState<string>("all");

  // Filtering logic
  const filteredBooks = filter === "all" ? books : books.filter((book) => book.author === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-black-900 p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-6 mt-10">All Products</h1>

      {/* Filter Section */}
      <div className="mb-6 flex justify-center">
        <select
          className="p-2 bg-gray-800 rounded"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All Authors</option>
          {Array.from(new Set(books.map((book) => book.author))).map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBooks.map((book) => (
          <div key={book.id} className="bg-gray-800 rounded-lg shadow-md p-4">
            <Image
              src={book.image}
              alt={book.title}
              width={200}
              height={300}
              className="rounded-md object-cover mx-auto mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-gray-400 mb-2">By {book.author}</p>
            <p className="text-gray-300 font-semibold">${book.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded ${page === currentPage ? "bg-white-500" : "bg-gray-700"} hover:bg-gray-600`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
