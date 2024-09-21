import React, { useState } from "react";
import { projectTags } from "../pages/api/projectTags";

export default function SearchTags({ setSearchTerm }) {
  const [selected, isSelected] = useState(-1);

  return (
    <div className="flex flex-wrap md:gap-5 gap-2 justify-center lg:w-[70%] w-[90%] mx-auto dark:text-white text-black">
      {projectTags.map((tags, idx) => {
        if (idx < 15) {
          return (
            <div
              className={`border border-code_of_conduct-1 sm:px-3 px-2 sm:py-2 py-1 cursor-pointer md:text-[15px] sm:text-[10px] text-[7px] ${
                idx === selected ? "bg-code_of_conduct-1" : ""
              }`}
              key={tags.title}
              onClick={() => {
                setSearchTerm(tags.title);
                isSelected(idx);
              }}
            >
              {tags.title}
            </div>
          );
        }
      })}
    </div>
  );
}
