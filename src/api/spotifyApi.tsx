import { clientId, clientSecret } from "@/helpers/constants";
import { Buffer } from "buffer";

export function isTokenExpired() {
  const tokenSetAt = Number(localStorage.getItem("token_set_at") || 0);
  const currentTime = new Date().getTime();
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
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("token_set_at", new Date().getTime().toString());
  return data.access_token;
}
