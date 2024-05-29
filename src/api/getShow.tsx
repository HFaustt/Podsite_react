import { myPodcastId } from "@/helpers/constants";

type GetEpisodesProps = {
  limit: string;
  offset?: string;
  search?: string;
};

export async function getEpisodes({ limit, offset = "0" }: GetEpisodesProps) {
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

export async function getSearchedEpisodes() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/shows/${myPodcastId}/episodes?limit=50`,
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

// export async function getSingleEpisode(episodeId: string | undefined) {
//   const accessToken = localStorage.getItem("access_token");

//   const response = await fetch(
//     `https://api.spotify.com/v1/episodes/${episodeId}?market=DZ`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       redirect: "follow",
//     }
//   );
//   const data = await response.json();
//   return data;
// }
