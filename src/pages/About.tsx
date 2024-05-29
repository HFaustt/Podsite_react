import { LiaSpotify } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import SpinnerFullPage from "@/components/shared/SpinnerFullPage";

export default function About() {
  return (
    <SpinnerFullPage /> && (
      <div className="flex items-center mt-20">
        <div className="flex flex-col ml-[9rem] w-1/2 ">
          <h1 className="text-8xl mt-20 bg-transparent uppercase">About me</h1>
          <div className="ml-6 pt-10 w-2/3">
            <p className="mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              ipsum repellat quaerat at magni adipisci illum iure sit minima
              recusandae. Adipisci voluptatum expedita quibusdam illum ratione
              repellat illo eius vero. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
            <p>
              Iusto odio cupiditate voluptas tenetur, maxime eaque deserunt
              impedit dolor in at provident earum quo accusantium? Non labore
              architecto nisi aliquid dignissimos?
            </p>
          </div>

          <hr className="border-y-4 border-black w-16 justify-end mt-20 mr-32 ml-auto" />
        </div>
        <div className="mt-10 w-1/2">
          <img
            src="/aboutPic.jpg"
            height={900}
            width={450}
            alt="about"
            className="scale-x-[-1] rounded-md shadow-2xl"
          />
          <div className="flex mt-3 items-center justify-end gap-10 w-[28rem]">
            <LiaSpotify className="text-3xl" />
            <FaInstagram className="text-2xl" />
            <AiOutlineFacebook className="text-2xl" />
          </div>
        </div>
      </div>
    )
  );
}
