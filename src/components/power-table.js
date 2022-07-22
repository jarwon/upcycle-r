import React, { useState, useEffect, useContext } from "react";
import { athleteZonesEndpoint } from "../../utilities/strava";
import { authContext } from "../context/provider";

const PowerTable = () => {
  const [athletePowerZones, setAthletePowerZones] = useState(null);
  const { makeStravaRequest } = useContext(authContext);
  const titleOfPowerZones = [
    "Active Recovery",
    "Endurance",
    "Tempo",
    "Threshold",
    "VO2Max",
    "Anaerobic",
    "Neuromuscular",
  ];

  const bgColorOfPowerZones = [
    "bg-gray-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-red-400",
    "bg-purple-400",
  ];

  const getData = async () => {
    try {
      const res = await makeStravaRequest("GET", athleteZonesEndpoint);
      if (res.ok) {
        const zoneData = await res.json();
        const powerZoneData = await zoneData["power"].zones;
        powerZoneData.forEach((zone, index) => {
          powerZoneData[index].title = titleOfPowerZones[index];

          powerZoneData[index].color = bgColorOfPowerZones[index];
        });
        setAthletePowerZones(powerZoneData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPowerZoneKey = (min, max) => {
    if (max === -1) {
      return `${min}+`;
    }
    return `${min}-${max}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="border-separate">
      <thead>
        <tr>
          <th className="uppercase text-sm font-medium text-green-900">
            Estimated Power Zones
          </th>
        </tr>
      </thead>
      <tbody>
        {athletePowerZones?.map((powerzone, index) => {
          return (
            <tr key={index}>
              <td className="bg-beige-400 text-sm px-2 py-1">
                {powerzone.title}
              </td>
              <td className={`font-spline px-2 py-1 ${powerzone.color}`}>
                {getPowerZoneKey(powerzone.min, powerzone.max)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PowerTable;
