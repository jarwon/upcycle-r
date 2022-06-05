// Step 1: Import React
import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";

const clientId = 83167;
const clientSecret = "36073471fd5bf8f963ade25fe5642a5699c0dc4d";
const token = "c6ec1af1bd27a74fced84a48bd0e1558504bfb52";
const baseUrl = "https://www.strava.com/api/v3";

// Step 2: Define your component
const ActivitiesPage = () => {
  //define state
  // const [ActivityIds, setActivityIds] = useState();
  const [Activities, setActivities] = useState();

  const getData = () => {
    const url = `${baseUrl}/athlete/activities?scope=activity:read_all&per_page=3"`;

    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((activitiesData) => {
        console.log(activitiesData);
        const ids = activitiesData.map((activity) => activity.id);
        ids.forEach((id) => {
          getActivity(id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActivity = (id) => {
    const url = `${baseUrl}/activities/${id}`;
    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((activity) => {
        // if Activities was an object: Activities['kasdjkasdja']

        // if Activities was an array Activities.find(activity => activity.id === id)

        setActivities((prevState) => {
          if (!prevState) {
            return [activity];
          }
          return [...prevState, activity];
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (!Activities) return;
  //   const activitiesWithCalories = Activities.forEach((activity) => {
  //     getCalories(activity.id);
  //   });
  // }, [Activities]);

  const convertSpeed = (speed) => {
    let converted = speed * 3.6;
    return converted.toFixed(2);
  };

  //early return
  if (!Activities) {
    return <div>Loading</div>;
  }

  return (
    <Layout>
      <div>
        <label for="activity-select">Filter Activities</label>

        <select name="activities" id="activity-select">
          <option value="">--Please choose an option--</option>
          <option value="ride">Ride</option>
          <option value="virtual ride">Virtual Ride</option>
          <option value="run">Run</option>
          <option value="walk">Walk</option>
        </select>
      </div>
      <div>
        <p>Activities:</p>
        {Activities.map((activity) => (
          <div key={activity.id} className="m-3">
            <h2>{activity.name}</h2>
            <p>Average speed: {convertSpeed(activity.average_speed)} km/h</p>
            <p>Average watts: {activity.average_watts}</p>
            <p>Calories: {activity.calories}</p>
            <p>Relative effort: {activity.suffer_score}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

// Step 3: Export your component
export default ActivitiesPage;
