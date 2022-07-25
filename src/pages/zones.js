import React, { useState, useMemo, useContext, useEffect } from "react";
import Layout from "../components/layout";
import PowerTable from "../components/power-table";
import { getActivities, getZones } from "../../utilities/strava";
import { getLastWeeksDate, dateToEpoch } from "../../utilities/date";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { authContext } from "../context/provider";

// const initialPowerZones = {
//   ["0"]: 0,
//   "0-50": 0,
//   "50-100": 0,
//   "100-150": 0,
//   "150-200": 0,
//   "200-250": 0,
//   "250-300": 0,
//   "300-350": 0,
//   "350-400": 0,
//   "400-450": 0,
//   "450+": 0,
// };

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "left",
    },
    title: {
      display: true,
      text: "Power Zone Distribution in the Last 7 Days",
      size: 20,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return formatTime(context.parsed.y);
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Watts",
      },
    },
    y: {
      title: {
        display: true,
        text: "Minutes",
      },
    },
  },
};

const getPowerZoneKey = ({ min, max }) => {
  if (min === 0 && max === 0) {
    return "0";
  }
  if (min === 450 && max === -1) {
    return "450+";
  }
  return `${min}-${max}`;
};

//minutes in decimals
const secondsToMinutes = (timeInSeconds) => {
  return timeInSeconds / 60;
};

const formatTime = (minutes) => {
  const duration = Math.floor(minutes * 60);
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

const Zones = ({ location }) => {
  const currentDate = new Date();
  const lastWeeksDate = getLastWeeksDate(currentDate);
  const [rides, setRides] = useState();
  const [totalPowerZones, setTotalPowerZones] = useState();
  const { makeStravaRequest } = useContext(authContext);

  const getData = async () => {
    try {
      const res = await makeStravaRequest(
        "GET",
        getActivities({
          before: dateToEpoch(currentDate),
          after: dateToEpoch(lastWeeksDate),
          // per_page: 5,
        })
      );
      if (res.ok) {
        const activities = await res.json();
        console.log(activities);
        saveRides(activities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRides = (activities) => {
    const activitiesByRides = activities.filter((activity) => {
      return activity.type === "Ride" || activity.type === "VirtualRide";
    });
    try {
      activitiesByRides.forEach(async (ride, index) => {
        const res = await makeStravaRequest("GET", getZones(ride.id));
        if (res.ok) {
          const zoneData = await res.json();
          const heartrate = zoneData.find((zoneItem) => {
            return zoneItem.type === "heartrate";
          });
          const power = zoneData.find((zoneItem) => {
            return zoneItem.type === "power";
          });

          activitiesByRides[index].heartrateZones =
            heartrate?.distribution_buckets;
          activitiesByRides[index].powerZones = power.distribution_buckets;

          console.log(ride);

          const powerZonesPerRide = ride.powerZones;
          powerZonesPerRide.forEach((individualPowerZone) => {
            const { min, max, time } = individualPowerZone;
            const key = getPowerZoneKey({ min, max });
            setTotalPowerZones((prev) => ({
              ...prev,
              [key]: time + prev?.[key] || 0,
            }));
          });
        }
      });
      setRides(activitiesByRides);
    } catch (error) {
      console.log(error);
    }
  };

  const labels = useMemo(() => {
    if (!totalPowerZones) {
      return;
    }
    return Object.keys(totalPowerZones);
  }, [totalPowerZones]);

  const data = useMemo(() => {
    if (!labels) {
      return;
    }
    return {
      labels,
      datasets: [
        {
          label: "Minutes",
          data: labels.map((label) => {
            return secondsToMinutes(totalPowerZones[label]);
          }),
          backgroundColor: "rgba(171, 196, 171, 0.7)",
          // backgroundColor: [
          //   "rgb(156 163 176 / 1)",
          //   "rgb(156 163 176 / 1)",
          //   "rgb(156 163 176 / 1)",
          //   "rgb(97 165 250)",
          //   "rgb(74 223 129)",
          //   "rgba(255, 159, 64, 0.2)",
          // ],
          xAxisID: "x",
        },
      ],
    };
  }, [labels]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout location={location}>
      <div className="lg:flex">
        <div className="lg:w-1/4">
          <PowerTable />
        </div>
        <div className="lg:w-3/4">
          {data && <Bar data={data} options={options} />}
        </div>
      </div>
    </Layout>
  );
};

export default Zones;
