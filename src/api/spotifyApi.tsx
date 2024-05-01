import { clientId, clientSecret } from "@/helpers/constants";
import { Buffer } from "buffer";

export function isTokenExpired() {
  const tokenSetAt = Number(localStorage.getItem("token_set_at") || 0);
  const currentTime = new Date().getTime();
  // console.log(currentTime - tokenSetAt);
  return (currentTime - tokenSetAt) / 1000 > 3600;
}

export async function getAccessToken(): Promise<string> {
  if (!isTokenExpired()) {
    return localStorage.getItem("access_token") || "";
  }
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  // console.log(data);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("token_set_at", new Date().getTime().toString());
  return data.access_token;
}

// export async function refreshToken() {
//   if (!isTokenExpired()) {
//     return;
//   }
//   const refreshToken = localStorage.getItem("refresh_token");
//   console.log(refreshToken);
//   const url = "https://accounts.spotify.com/api/token";

//   const payload = new URLSearchParams({
//     grant_type: "refresh_token",
//     refresh_token: refreshToken!,
//     client_id: clientId,
//     client_secret: clientSecret,
//   });

//   const body = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: payload,
//   });

//   const response = await body.json();

//   localStorage.setItem("access_token", response.access_token);
//   localStorage.setItem("refresh_token", response.refresh_token);

//   console.log(response);
//   return response.access_token;
// }
