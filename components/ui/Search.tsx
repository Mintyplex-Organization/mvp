import React from "react";

type SearchProps = {
  color?: string;
};

function Search({ color }: SearchProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <circle
        cx="10.6346"
        cy="10.6332"
        r="6.96667"
        stroke={color ? color : "#BFBFC0"}
        strokeWidth="1.5"
      />
      <path
        d="M15.7656 15.7666L18.3323 18.3333"
        stroke={color ? color : "#BFBFC0"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Search;
