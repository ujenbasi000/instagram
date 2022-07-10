import React from "react";

const SearchResults = () => {
  return (
    <div className="absolute z-50 left-1/2 -translate-x-1/2 top-[50px] bg-white border border-gray-200 shadow-md rounded-md">
      <div
        className="search_results_arrow z-10
      absolute -top-2 left-1/2 w-4 h-4 bg-white border-gray-200"
      />
      <div className="h-64 w-80 relative bg-white">
        <header className="flex items-center justify-between px-4 py-1">
          <h1 className="font-medium text-sm">Recent</h1>
          <span className="text-blue-600 text-xs">Clear all</span>
        </header>
      </div>
    </div>
  );
};

export default SearchResults;
