import { FaUserPen } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const BookCard = ({ book, toggleWishlist, isWishlisted }) => {
  // Function to reformat author's name from "Last, First Middle" to "First Middle Last"
  const formatAuthorName = (authorName) => {
    const [lastName, firstMiddleName] = authorName.split(", ");
    return `${firstMiddleName} ${lastName}`;
  };

  // Extract and format authors info
  const authors = book.authors
    .map((author) => formatAuthorName(author.name))
    .join(", ");

  return (
    <div className="border flex items-start gap-5 group overflow-hidden p-4 ">
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        className="w-1/2 h-80 object-cover group-hover:scale-105 transition-all duration-200 ease-in-out"
      />
      <div className="flex flex-col justify-between items-start h-full">
        <div>
          <h2 className="text-xl font-bold">{book.title}</h2>
          <div className="flex items-start gap-1 mt-2">
            <FaUserPen size={16} className="mb-0.5" />
            <p className="text-sm">{authors}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(book)}
            className="border p-1 rounded"
          >
            {isWishlisted ? (
              <LiaHeartSolid
                className="text-red-700 hover:scale-105 transition-all duration-200 ease-in-out"
                size={20}
              />
            ) : (
              <LiaHeart
                className="hover:scale-110 transition-all duration-200 ease-in-out"
                size={20}
              />
            )}
          </button>
          <Link to={`/book/${book?.id}`}>
            <button className=" py-1 pl-3 pr-2 rounded border text-black text-sm flex items-center gap-1 hover:bg-gray-800 hover:text-white transition-colors duration-200 ease-in-out">
              View Details <IoIosArrowForward className="mb-0.5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
