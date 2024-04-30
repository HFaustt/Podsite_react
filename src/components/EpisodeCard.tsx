import { getLatestEpisodes, getProfile } from "@/api/getShow";
import { formatMilliseconds } from "@/helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinner from "./shared/Spinner";

export default function EpisodeCard() {
  const {
    data: latestEp,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["latestEp"],
    queryFn: getLatestEpisodes,
  });

  if (error)
    return (
      <div>
        Failed to load data...
        <p>{error.message}</p>
      </div>
    );
  if (isLoading || isFetching) return <Spinner />;
  // console.log(latestEp);
  return (
    <div className="p-4 flex items-center justify-center w-96 gap-28">
      {latestEp.items.map((episode: any) => (
        <div key={episode.id}>
          <div className="items-center justify-center">
            <h2 className="text-center font-bold mb-3 line-clamp-1">
              {episode.name}
            </h2>
            <Link to={episode.external_urls.spotify} target="_blank">
              <img
                src={episode.images[0].url}
                alt="episode"
                className="mb-5 rounded-md"
              />
            </Link>
            <div className="flex items-center justify-center">
              <audio controls className="mb-5 items-center justify-center">
                <source src={episode.audio_preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p>Release Date: {episode.release_date}</p>
            <p>Duration: {formatMilliseconds(episode.duration_ms)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
