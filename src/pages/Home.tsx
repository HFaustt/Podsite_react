import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/EpisodeCard";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//TODO: use audio stuff from https://www.npmjs.com/package/react-h5-audio-player this library

export default function Home() {
  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <main>
      <div className="justify-center w-[100vw] h-[100vh] relative">
        <div className="relative w-full h-full">
          <img
            src="/stockPod.jpg"
            alt="background image"
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] opacity-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-6xl text-white uppercase absolute top-1/4 text-center font-bold font-mono">
            <span>Welcome to</span>
            <br />
            <h1 className="mt-2">Hamzatalks.podcast</h1>
          </div>
          <div className="flex flex-col items-center z-20 absolute top-1/3 mt-[7rem]">
            <div className="flex items-center mr-[68rem] my-5 gap-8 justify-start">
              <h2 className="font-bold text-4xl">Latest</h2>
              <div>
                <Link
                  to="/podcast"
                  className="text-xs underline cursor-pointer"
                >
                  <Button className="bg-slate-950 rounded-full px-5 mt-2 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                    See All
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <EpisodeCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
