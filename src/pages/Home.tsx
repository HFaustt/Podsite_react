import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/EpisodeCard";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <main>
      <div className="mt-4 justify-center bg-black w-[100vw] h-[28rem] relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <img
            src="/home-bg.jpg"
            alt="background image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col text-center items-center justify-center">
          <h1 className="text-5xl text-white bg-transparent z-20 uppercase absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10 font-bold">
            Hamzatalks.podcast
          </h1>
          <p className="text-white bg-transparent z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt soluta
            a minima quae exercitationem qui quaerat, perspiciatis tempora
            similique praesentium ut veritatis harum beatae doloremque culpa
            laudantium, sapiente repellat! Deserunt.
          </p>
          <div className="bg-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-28">
            <Button className=" px-14 py-2 bg-purple-700 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Button
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="font-bold text-xl mb-10">Latest Episodes</h2>
        <div>
          <EpisodeCard />
        </div>
      </div>
    </main>
  );
}
