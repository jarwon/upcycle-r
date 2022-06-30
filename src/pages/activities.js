// Step 1: Import React
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import ActivityTile from "../components/activity-tile";
import { navigate } from "gatsby";
import { getActivities, getActivity } from "../../utilities/strava";

const sortActivitiesByDate = (activities) => {
  return activities.sort((a, b) => {
    return Date.parse(b.start_date) - Date.parse(a.start_date);
  });
};

const ActivitiesPage = () => {
  //define state
  const [activities, setActivities] = useState();
  const [typeOfActivity, setTypeOfActivity] = useState("all");
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  const getData = async () => {
    try {
      const res = await getActivities({
        scope: "activity:read_all",
        per_page: 3,
      });
      if (res.ok) {
        const activitiesData = await res.json();
        console.log(activitiesData);
        const activitiesTemp = await Promise.all(
          activitiesData.map(async ({ id }) => {
            // return await getActivity(id);
            try {
              const resId = await getActivity(id);
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
      // navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //early return
  if (!activities) {
    return <div>loading</div>;
  }

  return (
    <Layout>
      <div>
        <label htmlFor="activity-select">filter activities by type</label>

        <select
          name="activities"
          id="activity-select"
          onChange={(e) => setTypeOfActivity(e.target.value)}
          value={typeOfActivity}
        >
          <option value="all">all</option>
          <option value="ride">ride</option>
          <option value="virtualride">virtual ride</option>
          <option value="run">run</option>
          <option value="walk">walk</option>
        </select>
      </div>
      <div>
        <p>activities:</p>
        <h1>Renders: {renderCounter.current}</h1>

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
                    console.log(activity);
                    navigate(`/activity/${activity.id}`, {
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
