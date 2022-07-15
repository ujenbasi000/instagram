import Home from "../../public/assets/icons/Home";
import Message from "../../public/assets/icons/Message";
import Explore from "../../public/assets/icons/Explore";
import Add from "../../public/assets/icons/Add";
import Notification from "../../public/assets/icons/Notification";
import Bookmarks from "../../public/assets/icons/Bookmarks";
import Settings from "../../public/assets/icons/Settings";
import SwitchAccounts from "../../public/assets/icons/SwitchAccounts";
import Profile from "../../public/assets/icons/Profile";
import Link from "next/link";
import useGlobalcontext from "../../hooks/useGlobalcontext";
import Image from "next/image";

const HeaderMenu = ({ setCreateNew }) => {
  const { user, menus, setMenus } = useGlobalcontext();

  return (
    <div className="flex items-center justify-center gap-6 relative z-20">
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
      <button>
        <span
          className="cursor-pointer"
          onClick={() => {
            setCreateNew(true);
          }}
        >
          <Add />
        </span>
      </button>
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
      {user && (
        <div className="relative">
          <Link href="/">
            <span
              onClick={() => setMenus(true)}
              className="cursor-pointer flex items-center justify-center"
            >
              <Image
                className="rounded-full object-contain"
                src={user.profile}
                width={32}
                height={32}
                alt={user.username}
              />
            </span>
          </Link>
          {menus && (
            <div className="absolute mt-2 top-full right-0 w-56 rounded-md border border-[border] shadow-md bg-white">
              <div className="search_results_arrow z-10 absolute -top-[0.4rem] right-1 w-3 h-3 bg-white border-gray-200" />
              <ul>
                <li>
                  <Link href="/">
                    <button className="flex gap-2 items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100">
                      <Profile />
                      <span>Profile</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="flex gap-2 items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100">
                      <Bookmarks width={17} />
                      <span>Saved</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="flex gap-2 items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100">
                      <Settings />
                      <span>Settings </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="flex gap-2 items-center w-full py-2 px-4 text-left text-xs hover:bg-gray-100">
                      <SwitchAccounts />
                      <span>Switch Accounts </span>
                    </button>
                  </Link>
                </li>
              </ul>
              <button className="flex gap-2 items-center w-full py-2 px-4 text-left text-xs border-t border-[border] hover:bg-gray-100">
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default HeaderMenu;
