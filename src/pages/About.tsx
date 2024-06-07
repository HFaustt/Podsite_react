import SocialMediaIcons from "@/components/shared/SocialMediaIcons";
import { currentYear } from "@/helpers/helpers";

export default function About() {
  return (
    <div className="relative min-h-screen bg-dark-100 flex flex-col items-center justify-center">
      <div className="container mx-auto flex flex-col items-center p-5 md:p-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase mt-8">
          About Me
        </h1>
        <div className="flex flex-col lg:flex-row items-center mt-10 lg:mt-20">
          <div className="flex-1 lg:pr-10 w-full h-full">
            <img
              src="/aboutPic.webp"
              alt="Profile Picture"
              className="w-full h-auto md:h-72 lg:h-96 object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 mt-8 lg:mt-0 lg:pl-10 text-left">
            <p className="mb-4 text-base md:text-lg lg:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              ipsum repellat quaerat at magni adipisci illum iure sit minima
              recusandae. Adipisci voluptatum expedita quibusdam illum ratione
              repellat illo eius vero.
            </p>
            <p className="mb-4 text-base md:text-lg lg:text-xl">
              Iusto odio cupiditate voluptas tenetur, maxime eaque deserunt
              impedit dolor in at provident earum quo accusantium? Non labore
              architecto nisi aliquid dignissimos?
            </p>
          </div>
        </div>
        <SocialMediaIcons />
      </div>
      <footer className="p-4 text-white text-center">
        &copy; {currentYear} hamzaTalks.podcast All rights reserved.
      </footer>
    </div>
  );
}
