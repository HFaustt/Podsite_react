import { getEpisodes } from "@/api/getShow";
import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/shared/EpisodeCard";
import EpisodeCarousel from "@/components/shared/EpisodeCarousel";
import EpisodeSkeleton from "@/components/shared/EpisodeSkeleton";
import { Button } from "@/components/ui/button";
import { currentYear } from "@/helpers/helpers";
import { EpisodeType } from "@/types/episode";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isAccessTokenFetched, setIsAccessTokenFetched] = useState(false);

  useQuery({
    queryKey: ["getAccessToken"],
    queryFn: async () => {
      const token = await getAccessToken();
      setIsAccessTokenFetched(true);
      return token;
    },
    enabled: !isAccessTokenFetched,
  });

  const LIMIT = 4;
  const offset = 0;

  const {
    data: episodes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getEpisodes"],
    queryFn: () =>
      getEpisodes({ limit: String(LIMIT), offset: offset.toString() }),
    enabled: isAccessTokenFetched,
  });

  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const handleAudioPlay = (id: string) => {
    setCurrentPlayingId(id === currentPlayingId ? null : id);
  };

  if (error) {
    return (
      <div>
        Failed to load data...
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute bottom-4 ml-[5rem]">
        <EpisodeSkeleton length={LIMIT} />
      </div>
    );
  }

  return (
    <main>
      <div className="w-[100vw] h-[100vh]">
        <div className="w-full h-full">
          <img
            src="/stockPod.webp"
            alt="background image"
            className="w-full h-full object-cover scale-x-[-1] opacity-60"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="xl:text-6xl md:text-4xl sm:text-2xl text-white uppercase absolute top-[13rem] text-center font-bold font-mono">
            <span className="text-4xl md:text-5xl lg:text-5xl font-bold font-mono uppercase text-white">
              Welcome to
            </span>
            <br />
            <h1 className="mt-2 text-2xl md:text-4xl lg:text-6xl font-bold font-mono uppercase">
              Hamzatalks.podcast
            </h1>
          </div>
          <div className="flex flex-col items-center absolute top-1/3 mt-[4rem]">
            {isAccessTokenFetched && (
              <div className="flex items-center absolute left-10 mt-16 gap-8 ">
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
            )}
            <Suspense>
              <div className="hidden lg:flex xl:flex justify-center w-full mt-[7rem] md:grid md:grid-cols-2 sm:grid-cols-1">
                {episodes?.items?.map((episode: EpisodeType) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    isPlaying={episode.id === currentPlayingId}
                    onTogglePlay={() => handleAudioPlay(episode.id)}
                  />
                ))}
              </div>
            </Suspense>
            {isAccessTokenFetched && (
              <div className="lg:hidden px-10 mt-[7rem] flex items-center">
                <EpisodeCarousel episodes={episodes?.items} />
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="p-4 text-white text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 hidden sm:block">
        &copy; {currentYear} hamzaTalks. All rights reserved.
      </footer>
    </main>
  );
}
