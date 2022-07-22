import React from "react";

const ActivityTile = ({ handleClick, goToActivity, activity }) => {
  const {
    name,
    start_date_local,
    distance,
    average_speed,
    average_watts,
    calories,
    suffer_score,
    type,
  } = activity;
  const convertSpeed = (speed) => {
    return (speed * 3.6).toFixed(2);
  };

  const convertDate = (date) => {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  };

  return (
    <div className="bg-beige-400 my-5 p-4 lowercase flex-column hover:bg-beige-900 duration-500">
      <div className="flex justify-between items-center mb-2">
        <p
          className="font-bold text-green-900 cursor-pointer"
          onClick={handleClick}
        >
          {name}
        </p>
        <p className="uppercase text-xs">{convertDate(start_date_local)}</p>
      </div>
      <p>
        <span className="uppercase text-xs mr-1">type </span>
        {type}
      </p>
      <p>
        <span className="uppercase text-xs mr-1">distance </span>
        <span className="font-spline">{(distance / 1000).toFixed(2)}</span>km
      </p>
      <p>
        <span className="uppercase text-xs mr-1">average speed </span>
        <span className="font-spline">{convertSpeed(average_speed)}</span> km/h
      </p>
      {average_watts && (
        <p>
          <span className="uppercase text-xs mr-1">average watts </span>
          <span className="font-spline">{Math.floor(average_watts)}W</span>
        </p>
      )}
      <p>
        <span className="uppercase text-xs mr-1">calories </span>
        <span className="font-spline">{Math.floor(calories)}</span>
      </p>
      {suffer_score && (
        <p>
          <span className="uppercase text-xs mr-1">relative effort </span>
          <span className="font-spline">{suffer_score}</span>
        </p>
      )}
    </div>
  );
};

export default ActivityTile;
