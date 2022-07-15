import { useEffect, useRef, useState } from "react";
import useGlobalcontext from "../../hooks/useGlobalcontext.js";
import CircleTimes from "../../public/assets/icons/CircleTimes.jsx";
import Search from "../../public/assets/icons/search.jsx";
import SearchResults from "../Header/SearchResults.js";

const SearchBar = () => {
  const { menus, setMenus } = useGlobalcontext();
  const [inputFocus, setInputFocus] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputFocus) inputRef.current.focus();
  }, [inputFocus]);

  return (
    <div className="bg-gray-200 rounded-md relative w-[250px] h-[2.2rem]">
      {(menus || inputFocus) && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-trasparent"
            onClick={() => {
              setInputFocus(false);
              setMenus(false);
            }}
          />
        </>
      )}
      {!inputFocus && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-200 z-30 rounded-md py-1 px-3 text-gray-600 cursor-text flex items-center justify-start gap-3"
          onClick={() => setInputFocus(true)}
        >
          <Search />
          <span className="text-sm">Search</span>
        </div>
      )}
      {inputFocus && (
        <>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <CircleTimes />
          </button>
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            className="outline-none py-[0.4rem] px-4 w-full bg-transparent relative z-40"
          />
          <SearchResults />
        </>
      )}
    </div>
  );
};

export default SearchBar;
