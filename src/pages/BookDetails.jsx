import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const BookDetails = () => {
  const { id } = useParams(); // Extract book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto py-10 px-5 md:px-0">
      {/* Book Header */}
      <div className="flex gap-10">
        <img
          src={book.formats["image/jpeg"]}
          alt={`${book.title} cover`}
          className="w-64 h-96 object-cover rounded-md shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-center mt-6">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mt-2">
            by {book.authors.map((author) => author.name).join(", ")}
          </h2>
        </div>
      </div>

      {/* Book Details */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Book Details</h3>
        <div>
          <p className="mb-2">
            <strong>Subjects:</strong> {book.subjects.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Bookshelves:</strong> {book.bookshelves.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Download Count:</strong> {book.download_count}
          </p>
          <p className="mb-2">
            <strong>Author's Birth Year:</strong>{" "}
            {book.authors[0]?.birth_year || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Author's Death Year:</strong>{" "}
            {book.authors[0]?.death_year || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Languages:</strong> {book.languages.join(", ")}
          </p>
        </div>
      </div>

      {/* Read The Book */}
      <div className="mt-5">
        <a
          href={book.formats["text/html"]} // Link to the text/html format for reading the book
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 pl-3 pr-2 rounded border text-sm flex items-center gap-1 bg-gray-800 text-white w-fit "
        >
          Read The Book <IoIosArrowForward className="mb-0.5" />
        </a>
      </div>
    </div>
  );
};

export default BookDetails;
