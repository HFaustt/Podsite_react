import { LiaSpotify } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";

export default function SocialMediaIcons() {
  return (
    <div className="flex justify-center items-center mt-3 gap-6 md:gap-10">
      <LiaSpotify className="text-3xl" />
      <FaInstagram className="text-2xl" />
      <AiOutlineFacebook className="text-2xl" />
    </div>
  );
}
