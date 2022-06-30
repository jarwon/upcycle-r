import React, { useState, useEffect } from "react";
import { getAthleteZones } from "../../utilities/strava";

const PowerTable = () => {
  const [athletePowerZones, setAthletePowerZones] = useState(null);

  const titleOfPowerZones = [
    "Active Recovery",
    "Endurance",
    "Tempo",
    "Threshold",
    "VO2Max",
    "Anaerobic",
    "Neuromuscular",
  ];

  const getData = async () => {
    try {
      const res = await getAthleteZones();
      if (res.ok) {
        const zoneData = await res.json();
        const powerZoneData = await zoneData["power"].zones;
        powerZoneData.forEach((zone, index) => {
          powerZoneData[index].title = titleOfPowerZones[index];
        });
        setAthletePowerZones(powerZoneData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Estimated Power Zones</th>
        </tr>
      </thead>
      <tbody>
        {athletePowerZones?.map((powerzone, index) => {
          return (
            <tr key={index}>
              <td>{powerzone.title}</td>
              <td>
                {powerzone.min} - {powerzone.max}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PowerTable;
