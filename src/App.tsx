import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Podcast from "./pages/Podcast";
import AppLayout from "./components/shared/AppLayout";
import PageNotFound from "./components/shared/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import SpinnerFullPage from "./components/shared/SpinnerFullPage";
import Episode from "./pages/Episode";

function App() {
  const queryClient = new QueryClient({});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route element={<AppLayout />} path="/">
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/podcast/:id" element={<Episode />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
