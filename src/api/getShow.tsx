import { myPodcastId } from "@/helpers/constants";

export async function getLatestEpisodes() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/shows/${myPodcastId}/episodes?limit=4`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getAllEpisodes(limit: string, offset: string) {
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
  // console.log(data);
  return data;
}
