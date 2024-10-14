import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
