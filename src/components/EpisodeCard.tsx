import { getLatestEpisodes } from "@/api/getShow";
import { formatMilliseconds } from "@/helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { EpisodeType } from "@/types/episode";
import EpisodeSkeleton from "./shared/EpisodeSkeleton";

export default function EpisodeCard() {
  const {
    data: latestEp,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestEp"],
    queryFn: getLatestEpisodes,
  });

  const LIMIT = 4;

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
  // console.log(latestEp);
  return (
    <div className="flex items-center justify-start w-auto gap-10 mx-[7rem]">
      {latestEp?.items.map((episode: EpisodeType) => (
        <div key={episode.id} className="relative">
          <div className="items-center">
            <div className="relative">
              <Link to={episode.external_urls.spotify} target="_blank">
                <img
                  src={episode.images[0].url}
                  alt="episode"
                  className="mb-5 rounded-md"
                />
              </Link>
              <div className="flex flex-col font-semibold">
                <div className="absolute top-0 left-1 p-1">
                  {episode.release_date}
                </div>
                <div className="absolute top-5 left-1 p-1">
                  {formatMilliseconds(episode.duration_ms)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <audio controls className="mb-5 items-center justify-center pb-3">
                <source src={episode.audio_preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
