import { myPodcastId } from "@/helpers/constants";

export async function getEpisodes(limit: string, offset: string = "0") {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/shows/${myPodcastId}/episodes?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
