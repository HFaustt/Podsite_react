import { useParams } from "react-router-dom";
import { getEpisodeById } from "@/api/getShow";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/api/spotifyApi";
import { useEffect } from "react";

export default function Episode() {
  useEffect(() => {
    getAccessToken();
  }, []);

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Episode: {id}</h1>
    </div>
  );
}
