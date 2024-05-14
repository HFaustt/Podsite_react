import { getSingleEpisode } from "@/api/getShow";
import { getAccessToken } from "@/api/spotifyApi";
import ParseHTML from "@/components/ParseHTML";
import { formatMilliseconds } from "@/helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Episode.module.css";

export default function EpisodePage() {
  useEffect(() => {
    getAccessToken();
  }, []);
  const { id } = useParams();

  const {
    data: episode,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["singleEp"],
    queryFn: () => getSingleEpisode(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="mt-[8rem] mx-5 flex">
      <div className="w-1/2">
        <header>
          <h1>{episode.name}</h1>
        </header>
        <div>
          <p>Duration : {formatMilliseconds(episode.duration_ms)}</p>
          <p>Release Date: {episode.release_date}</p>
        </div>
        <section>
          <img src={episode.images[0].url} alt={episode.name} />
        </section>
        <div>
          <audio src={episode.audio_preview_url} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
        </div>
      </div>
      <div className="w-1/2">
        <section className={styles.parsed}>
          <ParseHTML data={episode.html_description} />
        </section>
      </div>
    </main>
  );
}
