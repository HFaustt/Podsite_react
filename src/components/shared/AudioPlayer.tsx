import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { HiOutlinePauseCircle } from "react-icons/hi2";

type AudioPlayerProps = {
  src: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onUpdateProgress: (progress: number, id: string) => void;
};

export default function AudioPlayer({
  src,
  isPlaying,
  onTogglePlay,
  onUpdateProgress,
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);

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

  return (
    <div>
      <Button
        onClick={togglePlay}
        className="bg-transparent flex items-center justify-center absolute bottom-1 right-[-10px] hover:bg-transparent "
      >
        {!isPlaying ? (
          <MdOutlinePlayCircleOutline className="text-[36px] hover:text-[41px] transition-all ease-in-out duration-200" />
        ) : (
          <HiOutlinePauseCircle className="text-[36px] hover:text-[41px] transition-all ease-in-out duration-200" />
        )}
      </Button>

      <audio ref={audioRef} src={src} />
    </div>
  );
}
