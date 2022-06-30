import React from "react";
import { navigate } from "gatsby";

const ActivityTile = ({ handleClick, goToActivity, activity }) => {
  const { name, average_speed, average_watts, calories, suffer_score, type } =
    activity;
  const convertSpeed = (speed) => {
    return (speed * 3.6).toFixed(2);
  };
  return (
    <div className="tile m-3 p-3 bg-gray-100 lowercase flex-column">
      <p
        className="font-bold text-green-900 cursor-pointer"
        onClick={handleClick}
      >
        {name}
      </p>
      <p>type: {type}</p>
      <p>
        average speed:{" "}
        <span className="font-spline">{convertSpeed(average_speed)}</span> km/h
      </p>
      {average_watts && (
        <p>
          average watts: <span className="font-spline">{average_watts}</span>
        </p>
      )}
      <p>
        calories: <span className="font-spline">{Math.floor(calories)}</span>
      </p>
      <p>
        relative effort: <span className="font-spline">{suffer_score}</span>
      </p>
    </div>
  );
};

export default ActivityTile;
