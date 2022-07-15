import Image from "next/image";
import InstagramLogo from "../../public/assets/instagram-logo.png";
import { SearchBar } from "../";
import HeaderMenu from "./HeaderMenu";

const Header = ({ setCreateNew }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-20 bg-white px-3 border-b border-gray-300">
      <div className="container mx-auto py-2 h-[60px] flex items-center justify-between">
        <Image src={InstagramLogo} width={120} height={35} alt="Logo" />
        <SearchBar />
        <HeaderMenu setCreateNew={setCreateNew} />
      </div>
    </div>
  );
};

export default Header;
