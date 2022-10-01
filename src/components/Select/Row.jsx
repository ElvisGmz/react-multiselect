import React from 'react';
import classNames from 'classnames';

// eslint-disable-next-line react/prop-types
export default function Row({ data = null, disabled = false, onClick = () => {} }) {
  return (
    <button
      type="button"
      className={classNames('px-4 py-2 w-full bg-white hover:bg-blue-50 transition-all duration-300 ease-in-out text-left', {
        'pointer-events-none opacity-60': disabled,
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClick(data);
      }}
    >
      {data?.label}
    </button>
  );
}
