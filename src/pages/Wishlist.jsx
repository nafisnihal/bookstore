import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

const Wishlist = () => {
  const [wishlistBooks, setWishlistBooks] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books details for the wishlist
    const fetchWishlistBooks = async () => {
      const booksData = await Promise.all(
        wishlistBooks.map(async (bookId) => {
          const response = await axios.get(
            `https://gutendex.com/books?ids=${bookId}`
          );
          return response.data.results[0];
        })
      );
      setBooks(booksData);
      setLoading(false);
    };

    if (wishlistBooks.length) {
      fetchWishlistBooks();
    } else {
      setLoading(false);
    }
  }, [wishlistBooks]);

  const toggleWishlist = (book) => {
    const updatedWishlist = wishlistBooks.includes(book.id)
      ? wishlistBooks.filter((id) => id !== book.id)
      : [...wishlistBooks, book.id];
    setWishlistBooks(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="pt-5 container mx-auto">
      <h1 className="text-2xl mb-4">Your Wishlist</h1>
      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5 transition-opacity duration-500">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlistBooks.includes(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
