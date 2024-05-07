import { getAccessToken } from "@/api/spotifyApi";
import AllEpisodes from "@/components/AllEpisodes";
// import Pagination from "@/components/Pagination";
import { useEffect } from "react";

export default function Podcast() {
  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-10">Podcast</h1>
      <div className="mx-20">
        <AllEpisodes />
      </div>
    </div>
  );
}
