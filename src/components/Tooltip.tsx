"use client";

import { useState } from "react";

export function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onClick={() => setShow((prev) => !prev)}
        className="w-4 h-4 rounded-full bg-neutral-700 text-neutral-400 text-[10px] leading-none flex items-center justify-center cursor-help hover:bg-neutral-600 transition-colors"
        aria-label="More information"
      >
        ?
      </button>
      {show && (
        <span className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-neutral-200 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-64 text-left leading-relaxed">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-neutral-700" />
        </span>
      )}
    </span>
  );
}
