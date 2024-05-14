import { getEpisodes } from "@/api/getShow";
import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/shared/EpisodeCard";
import Pagination from "@/components/Pagination";
import EpisodeSkeleton from "@/components/shared/EpisodeSkeleton";
import { EpisodeType } from "@/types/episode";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Podcast() {
  useEffect(() => {
    getAccessToken();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const LIMIT = 9;
  const offset = (currentPage - 1) * LIMIT;
  const isPodcastPage: boolean = true;

  const {
    data: episodes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getEpisodes", currentPage],
    queryFn: () => getEpisodes(String(LIMIT), offset.toString()),
  });

  const totalPages = Math.ceil(episodes?.total / episodes?.limit);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (isLoading)
    return (
      <div className="items-center justify-center">
        <EpisodeSkeleton length={LIMIT} />
      </div>
    );

  if (error)
    return (
      <div>
        Failed to load data...
        <p>{error.message}</p>
      </div>
    );

  const handleAudioPlay = (id: string) => {
    setCurrentPlayingId(id === currentPlayingId ? null : id);
  };

  return (
    <div className="mt-20">
      <h1 className="text-5xl font-bold text-center ">Podcast</h1>

      <div className="mx-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-14 gap-4 mt-10 justify-center">
        {episodes.items.map((episode: EpisodeType) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            isPlaying={episode.id === currentPlayingId}
            onTogglePlay={() => handleAudioPlay(episode.id)}
            title={episode.name}
            isPodcastPage={isPodcastPage}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
