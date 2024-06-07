import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EpisodeCard from "@/components/shared/EpisodeCard";
import { EpisodeType } from "@/types/episode";
import { useState } from "react";

type EpisodeCarouselProps = {
  episodes: EpisodeType[];
};

const EpisodeCarousel: React.FC<EpisodeCarouselProps> = ({ episodes }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const handleAudioPlay = (id: string) => {
    setCurrentPlayingId(id === currentPlayingId ? null : id);
  };

  return (
    <div className="relative w-full">
      <Carousel>
        <CarouselContent className="flex gap-4">
          {episodes?.map((episode: EpisodeType) => (
            <CarouselItem key={episode.id} className="min-w-[80%]">
              <EpisodeCard
                episode={episode}
                isPlaying={episode.id === currentPlayingId}
                onTogglePlay={() => handleAudioPlay(episode.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full" />
      </Carousel>
    </div>
  );
};

export default EpisodeCarousel;
