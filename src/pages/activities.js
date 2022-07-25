// Step 1: Import React
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import ActivityTile from "../components/activity-tile";
import { navigate } from "gatsby";
import { getActivities, getActivity } from "../../utilities/strava";
import { authContext } from "../context/provider";

const sortActivitiesByDate = (activities) => {
  return activities.sort((a, b) => {
    return Date.parse(b.start_date) - Date.parse(a.start_date);
  });
};

const ActivitiesPage = ({ location }) => {
  const [activities, setActivities] = useState();
  const [typeOfActivity, setTypeOfActivity] = useState("all");
  const { makeStravaRequest } = useContext(authContext);

  const getData = async () => {
    try {
      const res = await makeStravaRequest(
        "GET",
        getActivities({
          scope: "activity:read_all",
          per_page: 3,
          //change to past week
        })
      );
      if (res.ok) {
        const activitiesData = await res.json();
        console.log(activitiesData);
        const activitiesTemp = await Promise.all(
          activitiesData.map(async ({ id }) => {
            try {
              const resId = await makeStravaRequest("GET", getActivity(id));
              if (resId.ok) {
                return await resId.json();
              }
            } catch (error) {
              console.error(error);
            }
          })
        );
        setActivities(activitiesTemp);
      }
      // throw new Error(res.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!activities) {
    return <div className="text-center">loading...</div>;
  }

  return (
    <Layout location={location}>
      <div>
        <div className="flex justify-end items-center">
          <label
            htmlFor="activity-select"
            className="mr-2 text-gray-600 uppercase text-xs"
          >
            filter by type
          </label>

          <select
            name="activities"
            id="activity-select"
            onChange={(e) => setTypeOfActivity(e.target.value)}
            value={typeOfActivity}
            className="p-2 bg-beige-400"
          >
            <option value="all">all</option>
            <option value="ride">ride</option>
            <option value="virtualride">virtual ride</option>
            <option value="run">run</option>
            <option value="walk">walk</option>
          </select>
        </div>
      </div>

      <div>
        <div className="activity">
          {sortActivitiesByDate(activities)?.map((activity) => {
            if (
              activity.type.toLowerCase() === typeOfActivity.toLowerCase() ||
              typeOfActivity === "all"
            )
              return (
                <ActivityTile
                  handleClick={(event) => {
                    event.preventDefault();
                    navigate(`/activities/${activity.id}`, {
                      state: { activity },
                    });
                  }}
                  activity={activity}
                  key={activity.id}
                />
              );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ActivitiesPage;
