import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { HiOutlinePauseCircle } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

type AudioPlayerProps = {
  src: string;
  isPlaying?: boolean;
  isPodcastPage?: boolean;
  onTogglePlay: () => void;
  onUpdateProgress: (progress: number, id: string) => void;
};

export default function AudioPlayer({
  src,
  isPlaying,
  onTogglePlay,
  onUpdateProgress,
}: AudioPlayerProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          onUpdateProgress(progress, src);
        }
      };
    }
  }, [onUpdateProgress, src]);

  function togglePlay(): void {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    onTogglePlay();
  }

  const btnStyle =
    currentPath === "/podcast"
      ? "top-[3.2rem] right-[-10px] "
      : "top-7 right-[-0.7rem]";

  return (
    <div>
      <Button
        onClick={togglePlay}
        className={`bg-transparent flex items-center justify-center absolute ${btnStyle} hover:bg-transparent`}
      >
        {!isPlaying ? (
          <MdOutlinePlayCircleOutline className="text-[44px] transition-all ease-in-out duration-200 hover:scale-110" />
        ) : (
          <HiOutlinePauseCircle className="text-[44px] hover:scale-110 transition-all ease-in-out duration-200" />
        )}
      </Button>

      <audio ref={audioRef} src={src} />
    </div>
  );
}
