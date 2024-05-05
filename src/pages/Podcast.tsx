import { getAccessToken } from "@/api/spotifyApi";
import AllEpisodes from "@/components/AllEpisodes";
import { useEffect } from "react";

export default function Podcast() {
  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-10">Podcast</h1>
      <div className="mx-10">
        <AllEpisodes />
      </div>
    </div>
  );
}
