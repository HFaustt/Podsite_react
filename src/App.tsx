import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Podcast from "./pages/Podcast";
import AppLayout from "./components/ui/AppLayout";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} path="/">
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/podcast" element={<Podcast />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
