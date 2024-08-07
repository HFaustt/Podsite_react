import { formatMilliseconds } from "@/helpers/helpers";
import { Link } from "react-router-dom";
import { EpisodeType } from "@/types/episode";
import AudioPlayer from "./AudioPlayer";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

type EpisodeCardProps = {
  episode: EpisodeType;
  isPlaying: boolean;
  title?: string;
  onTogglePlay: () => void;
  isPodcastPage?: boolean;
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  isPlaying,
  title,
  onTogglePlay,
  isPodcastPage,
}) => {
  const [progress, setProgress] = useState(0);

  function updateProgress(progress: number) {
    setProgress(progress);
  }

  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div
      className={`lg:flex items-center justify-start w-auto lg:gap-10 lg:mx-10 md:mx-[7rem] sm:text-white ${
        isPodcastPage ? "mx-[-2rem]" : ""
      }`}
    >
      <div className="relative">
        <div className="items-center">
          <div className="mb-5 text-center text-lg font-bold line-clamp-1">
            <h2>{title}</h2>
          </div>
          <div className="relative">
            <Link to={episode.external_urls.spotify} target="_blank">
              <img
                src={
                  smallScreen ? episode.images[1].url : episode.images[0].url
                }
                alt="episode"
                className="rounded-md"
                width={isPodcastPage ? 450 : 350}
                height={isPodcastPage ? 450 : 350}
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
