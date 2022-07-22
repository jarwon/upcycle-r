import React from "react";

const StatTile = ({ title, stat, width, flex }) => {
  return (
    <div
      className={`bg-beige-400 ${width} flex flex-col mb-2 text-center p-3 ${flex}`}
    >
      <h2 className="uppercase text-xs align-middle">{title}</h2>
      <p className="text-xl">{stat}</p>
    </div>
  );
};

export default StatTile;
