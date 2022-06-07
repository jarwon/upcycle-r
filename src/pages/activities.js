// Step 1: Import React
import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import ActivityTile from "../components/activity-tile";
import { navigate } from "gatsby";

const clientId = 83167;
const clientSecret = "36073471fd5bf8f963ade25fe5642a5699c0dc4d";
const token = "c9f0108dd563920328846970fed21a1a7311c0e5";
const baseUrl = "https://www.strava.com/api/v3";

// Step 2: Define your component
const ActivitiesPage = () => {
  //define state
  // const [ActivityIds, setActivityIds] = useState();
  const [activities, setActivities] = useState();
  const [typeOfActivity, setTypeOfActivity] = useState("all");

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

  // const filteredActivities = activities.filter((activity) =>
  //   activity.type.toLowerCase().includes(typeOfActivity.toLowerCase())
  // );

  //early return
  if (!activities) {
    return <div>Loading</div>;
  }

  return (
    <Layout>
      <div>
        <label htmlFor="activity-select">Filter Activities</label>

        <select
          name="activities"
          id="activity-select"
          onChange={(e) => setTypeOfActivity(e.target.value)}
          value={typeOfActivity}
        >
          <option value="all">Please choose an option</option>
          <option value="ride">Ride</option>
          <option value="virtual ride">Virtual Ride</option>
          <option value="run">Run</option>
          <option value="walk">Walk</option>
        </select>
      </div>
      <div>
        <p>Activities:</p>

        <div className="activity">
          {activities.map((activity) => {
            if (
              activity.type.toLowerCase() === typeOfActivity.toLowerCase() ||
              typeOfActivity === "all"
            )
              return (
                <div key={activity.id}>
                  <ActivityTile
                    activities={activities}
                    name={activity.name}
                    averageSpeed={activity.average_speed}
                    averageWatts={activity.average_watts}
                    calories={activity.calories}
                    sufferScore={activity.sufferScore}
                    type={activity.type}
                  />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      console.log(activity);
                      navigate(`/activity/${activity.id}`, {
                        state: { activities },
                      });
                    }}
                  >
                    go to activity
                  </button>
                </div>
              );
          })}
        </div>
      </div>
    </Layout>
  );
};

// Step 3: Export your component
export default ActivitiesPage;
