import Home from "../../public/assets/icons/Home";
import Message from "../../public/assets/icons/Message";
import Explore from "../../public/assets/icons/Explore";
import Add from "../../public/assets/icons/Add";
import Notification from "../../public/assets/icons/Notification";
import Link from "next/link";

const HeaderMenu = () => {
  return (
    <div className="flex items-center justify-center gap-6 relative z-40">
      <Link href="/">
        <span className="cursor-pointer">
          <Home />
        </span>
      </Link>
      <Link href="/">
        <span className="cursor-pointer">
          <Message />
        </span>
      </Link>
      <Link href="/">
        <span className="cursor-pointer">
          <Add />
        </span>
      </Link>
      <Link href="/">
        <span className="cursor-pointer">
          <Explore />
        </span>
      </Link>
      <Link href="/">
        <span className="cursor-pointer">
          <Notification />
        </span>
      </Link>
    </div>
  );
};
export default HeaderMenu;
