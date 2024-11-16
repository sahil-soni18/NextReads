// import React from 'react'

// type Props = {}

// const page = (props: Props) => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

import Image from "next/image";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "/images/great-gatsby.jpg",
    price: "$10",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    image: "/images/1984.jpg",
    price: "$15",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://unsplash.com/photos/black-leather-armchair-beside-brown-wooden-shelf-W3A3DUhPkVM",
    price: "$12",
  },
];

export default function AllBooks() {
  return (
    <div className="min-h-screen bg-black-100 p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-6 mt-20">All Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <Image
              src={book.image}
              alt={book.title}
              width={150}
              height={200}
              className="rounded-md object-cover mx-auto mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-white-700 mb-2">By {book.author}</p>
            <p className="text-white-800 font-semibold">{book.price}</p>
            <button className="mt-4 px-4 py-2 bg-white text-black rounded transform transition-transform hover:scale-110 hover:bg-gray-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
