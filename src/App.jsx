import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import WatchList from "./components/WatchList";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </Router>
  );
}

export default App;
