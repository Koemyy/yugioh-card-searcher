import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { getUserId } from "./utils/userId";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

const App = () => {
  const userId = getUserId();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/favorites" element={<Favorites userId={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
