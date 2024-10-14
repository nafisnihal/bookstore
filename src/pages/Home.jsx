import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

const Home = () => {
  const [books, setBooks] = useState([]);
  console.log("🚀 ~ Home ~ books:", books);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
    setLoading(true);
  }, [currentPage]);

  useEffect(() => {
    scrollTo(0, 0);
  }, [search, books]);

  const fetchBooks = async () => {
    const response = await axios.get(
      `https://gutendex.com/books/?page=${currentPage}`
    );
    setBooks(response.data.results);
    setLoading(false);
  };

  const toggleWishlist = (book) => {
    const newWishlist = wishlist.includes(book.id)
      ? wishlist.filter((id) => id !== book.id)
      : [...wishlist, book.id];
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto pb-10 pt-5">
          <input
            type="text"
            placeholder="Search books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 ml-auto block"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(book.id)}
              />
            ))}
          </div>

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
        </div>
      )}
    </>
  );
};

export default Home;
