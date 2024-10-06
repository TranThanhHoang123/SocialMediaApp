// src/components/DropDown/DropDown.js
import React from 'react';

const DropDown = ({ items }) => {
  return (
    <ul
      role="menu"
      className="absolute right-0 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
    >
      {items.map((item, index) => (
        <li
          key={index}
          role="menuitem"
          className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          <a href={item.link} className="flex items-center w-full">
            <p className="text-slate-800 font-medium ml-2">{item.title}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
