import React from "react";
import { navigate } from "gatsby";

const ActivityTile = ({
  goToActivity,
  activities,
  activity,
  name,
  averageSpeed,
  averageWatts,
  calories,
  sufferScore,
  type,
}) => {
  const convertSpeed = (speed) => {
    return (speed * 3.6).toFixed(2);
  };
  return (
    <div className="m-3">
      <h2>{name}</h2>
      <p>Average speed: {convertSpeed(averageSpeed)} km/h</p>
      <p>Average watts: {averageWatts}</p>
      <p>Calories: {calories}</p>
      <p>Relative effort: {sufferScore}</p>
      <p>Type: {type}</p>
    </div>
  );
};

export default ActivityTile;
