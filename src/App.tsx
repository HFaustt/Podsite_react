import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import PageNotFound from "./components/shared/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/shared/SpinnerFullPage";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Podcast = lazy(() => import("./pages/Podcast"));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route element={<AppLayout />} path="/">
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/podcast" element={<Podcast />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
