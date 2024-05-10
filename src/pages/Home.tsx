import { getEpisodes } from "@/api/getShow";
import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeSkeleton from "@/components/shared/EpisodeSkeleton";
import { Button } from "@/components/ui/button";
import { EpisodeType } from "@/types/episode";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    getAccessToken();
  }, []);

  const LIMIT = 4;
  const offset = 0;

  const {
    data: episodes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getEpisodes"],
    queryFn: () => getEpisodes(String(LIMIT), offset.toString()),
  });

  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const handleAudioPlay = (id: string) => {
    setCurrentPlayingId(id === currentPlayingId ? null : id);
  };

  if (error)
    return (
      <div>
        Failed to load data...
        <p>{error.message}</p>
      </div>
    );
  if (isLoading)
    return (
      <div>
        <EpisodeSkeleton length={LIMIT} />
      </div>
    );

  return (
    <main>
      <div className="w-[100vw] h-[100vh] relative">
        <div className="relative w-full h-full">
          <img
            src="/stockPod.jpg"
            alt="background image"
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] opacity-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-6xl text-white uppercase absolute top-1/4 text-center font-bold font-mono ">
            <span>Welcome to</span>
            <br />
            <h1 className="mt-2">Hamzatalks.podcast</h1>
          </div>
          <div className="flex flex-col items-center absolute top-1/3 mt-[7rem]">
            <div className="flex items-center mr-[71rem] mt-16 gap-8">
              <h2 className="font-bold text-4xl">Latest</h2>
              <div>
                <Link
                  to="/podcast"
                  className="text-xs underline cursor-pointer"
                >
                  <Button className="bg-slate-950 rounded-full px-5 mt-2 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                    See All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center w-full">
              {episodes?.items.map((episode: EpisodeType) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  isPlaying={episode.id === currentPlayingId}
                  onTogglePlay={() => handleAudioPlay(episode.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
