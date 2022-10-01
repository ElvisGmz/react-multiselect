import React from 'react';

/* eslint-disable react/prop-types */
export default function SelectedItem({
  name = '',
  data = null,
  onClick = () => {},
  inputMode = false,
}) {
  return (
    <>
      <button
        type="button"
        className="group text-sm relative flex items-stretch whitespace-nowrap bg-green-200 rounded"
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
      >
        <span className="px-2 py-0.5">{data?.label}</span>
        <span className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 w-full h-full bg-red-400 flex justify-center items-center text-white rounded transition-opacity duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </span>
      </button>
      {
          inputMode && <input type="hidden" name={name} value={data?.value} />
        }
    </>
  );
}
