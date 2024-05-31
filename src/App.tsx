import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { getUserId } from "./utils/userId";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import { CroctProvider } from "@croct/plug-react";

const App = () => {
  const userId = getUserId();

  return (
    <CroctProvider appId="c3b8f6c9-dabd-4f92-aeab-25264bb706e2">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home userId={userId} />} />
          <Route path="/favorites" element={<Favorites userId={userId} />} />
        </Routes>
      </Router>
    </CroctProvider>
  );
};

export default App;
