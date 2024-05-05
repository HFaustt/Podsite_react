import { getAllEpisodes } from "@/api/getShow";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./shared/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { formatMilliseconds } from "@/helpers/helpers";

export default function AllEpisodes() {
  const navigate = useNavigate();
  const {
    data: allEpisodes,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["allEpisodes"],
    queryFn: getAllEpisodes,
  });

  if (isFetching || isLoading)
    return (
      <div className="flex items-center justify-center text-5xl">
        <Spinner />;
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

  return (
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
              <img src={episode.images[0].url} alt="episode" className="mb-5" />
            </Link>
            <div className="flex items-center justify-center">
              <audio controls className="mb-5 items-center justify-center">
                <source src={episode.audio_preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p className="text-center">Release Date: {episode.release_date}</p>
            <p className="mb-10 text-center">
              Duration: {formatMilliseconds(episode.duration_ms)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
