import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="flex items-center justify-between container mx-auto">
        <h1 className="text-white text-2xl">
          <Link to="/">Bookstore</Link>
        </h1>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
