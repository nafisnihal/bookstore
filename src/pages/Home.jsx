import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // Save filter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Save search term to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  }, [search, books, currentPage]);

  const fetchBooks = async () => {
    const topicQuery = filter ? `&topic=${filter}` : "";
    const response = await axios.get(
      `https://gutendex.com/books/?page=${currentPage}${topicQuery}`
    );
    setBooks(response.data.results);
    setLoading(false);
  };

  // Fetch books whenever currentPage or filter (genre) changes
  useEffect(() => {
    fetchBooks();
    setLoading(true);
  }, [currentPage, filter]);

  const toggleWishlist = (book) => {
    const newWishlist = wishlist.includes(book.id)
      ? wishlist.filter((id) => id !== book.id)
      : [...wishlist, book.id];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // Filter books based on search input
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto pb-10 pt-5 px-5 md:px-0">
        <div className="flex justify-between">
          {/* Search Bar */}
          <div className="relative w-[200px]">
            <input
              type="text"
              placeholder="Search books"
              disabled={loading}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center justify-between px-2 text-gray-700">
              <IoSearchOutline />
            </div>
          </div>

          {/* Genre Filter */}
          <div className="relative inline-block w-[200px]">
            <select
              disabled={loading}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">All Genres</option>
              <option value="children">Children</option>
              <option value="science">Science</option>
              <option value="fiction">Fiction</option>
              <option value="history">History</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Book List */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5 transition-opacity duration-500">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(book.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="w-full flex items-center justify-between mt-5">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded w-32 ${
                  currentPage === 1
                    ? "bg-gray-200 text-black"
                    : "bg-gray-800 text-white"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-800 p-2 rounded text-white w-32"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
