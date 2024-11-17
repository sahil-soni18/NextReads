import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "John Doe",
    image: "/images/react-hooks.jpg",
    date: "Nov 17, 2024",
    description:
      "Learn about the basics of React Hooks and how they simplify state management and lifecycle methods in functional components.",
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox",
    author: "Jane Smith",
    image: "/images/css-grid.jpg",
    date: "Oct 5, 2024",
    description:
      "A detailed comparison between CSS Grid and Flexbox, and when to use one over the other in modern web design.",
  },
  {
    id: 3,
    title: "JavaScript Async Patterns",
    author: "Alice Johnson",
    image: "/images/js-async.jpg",
    date: "Sep 21, 2024",
    description:
      "Explore asynchronous programming in JavaScript, covering callbacks, promises, and async/await.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      {/* Blog Heading */}
      <div className="mt-10">
        <h1 className="text-4xl font-extrabold text-white text-center">
          Blog Posts
        </h1>
        <p className="text-gray-400 text-center mt-5">
          Stay updated with the latest insights and guides
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={250}
              className="rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-300 mb-6">{blog.description}</p>
              <button className="mt-4 px-4 py-2 bg-white text-black rounded transform transition-transform hover:scale-110 hover:bg-gray-600">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
