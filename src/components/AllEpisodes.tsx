import { getAllEpisodes } from "@/api/getShow";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { formatMilliseconds } from "@/helpers/helpers";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import EpisodeSkeleton from "./shared/EpisodeSkeleton";

export default function AllEpisodes() {
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT = 9;
  const offset = (currentPage - 1) * LIMIT;

  const navigate = useNavigate();
  const {
    data: allEpisodes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allEpisodes", currentPage],
    queryFn: () => getAllEpisodes(String(LIMIT), offset.toString()),
  });

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

  function onLinkClick(id: string, event: any) {
    event.preventDefault();
    navigate(`/podcast/${id}`);
  }

  const totalPages = Math.ceil(allEpisodes.total / allEpisodes.limit);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-20">
        {allEpisodes.items.map((episode: any) => (
          <div key={episode.id}>
            <div className="items-center justify-center">
              <h2 className="text-center font-bold mb-3 line-clamp-1">
                {episode.name}
              </h2>
              <Link
                to={`/podcast/${episode.id}`}
                target="_blank"
                onClick={(event) => onLinkClick(episode.id, event)}
              >
                <img
                  src={episode.images[0].url}
                  alt="episode"
                  className="mb-5"
                />
              </Link>
              <div className="flex items-center justify-center">
                <audio controls className="mb-5 items-center justify-center">
                  <source src={episode.audio_preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <p className="text-center">
                Release Date: {episode.release_date}
              </p>
              <p className="mb-10 text-center">
                Duration: {formatMilliseconds(episode.duration_ms)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
