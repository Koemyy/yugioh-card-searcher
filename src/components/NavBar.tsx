import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Yu-Gi-Oh Card Browser
        </Link>
        <Link to="/favorites" className="text-white">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
