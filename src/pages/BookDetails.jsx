import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://gutendex.com/books/${id}`);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl">{book.title}</h1>
      <img src={book.formats["image/jpeg"]} alt={book.title} />
      <p>{book.authors.map((a) => a.name).join(", ")}</p>
      <p>{book.genres}</p>
    </div>
  );
};

export default BookDetails;
