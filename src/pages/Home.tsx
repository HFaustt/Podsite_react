import { getAccessToken } from "@/api/spotifyApi";
import EpisodeCard from "@/components/EpisodeCard";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
          {/* <p className="text-white bg-transparent z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt soluta
            a minima quae exercitationem qui quaerat, perspiciatis tempora
            similique praesentium ut veritatis harum beatae doloremque culpa
            laudantium, sapiente repellat! Deserunt.
          </p>
          <div className="bg-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-28">
            <Button className=" px-14 py-2 bg-purple-700 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Button
            </Button>
          </div> */}
        </div>
      </div>
    </main>
  );
}
