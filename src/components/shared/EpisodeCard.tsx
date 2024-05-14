import { formatMilliseconds } from "@/helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
import { EpisodeType } from "@/types/episode";
import AudioPlayer from "./AudioPlayer";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

type EpisodeCardProps = {
  episode: EpisodeType;
  isPlaying: boolean;
  title?: string;
  isPodcastPage?: boolean;
  onTogglePlay: () => void;
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  isPlaying,
  title,
  onTogglePlay,
  isPodcastPage,
}) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  function updateProgress(progress: number) {
    setProgress(progress);
  }

  function onLinkClick(id: string, event: any) {
    event.preventDefault();
    navigate(`/podcast/${id}`);
  }

  return (
    <div className="flex items-center justify-start w-auto gap-10 mx-10">
      <div className="relative">
        <div className="items-center">
          <div className="mb-5 text-center text-lg font-bold line-clamp-1">
            <h2>{title}</h2>
          </div>
          <div className="relative">
            {!isPodcastPage ? (
              <Link to={episode.external_urls.spotify} target="_blank">
                <img
                  src={episode.images[0].url}
                  alt="episode"
                  className="rounded-md"
                />
              </Link>
            ) : (
              <Link
                to={`/podcast/${episode.id}`}
                target="_blank"
                onClick={(event) => onLinkClick(episode.id, event)}
              >
                <img
                  src={episode.images[0].url}
                  alt="episode"
                  className="rounded-md"
                />
              </Link>
            )}

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
            <AudioPlayer
              src={episode.audio_preview_url}
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
              onUpdateProgress={updateProgress}
            />
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
