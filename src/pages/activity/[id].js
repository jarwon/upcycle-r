import React from "react";
import Layout from "../../components/layout";
import { useEffect } from "react";
import StatTile from "../../components/stat-tile";
import { formatTime } from "../../../utilities/date";
import { navigate } from "gatsby";

const ActivityPage = ({ location }) => {
  const {
    state: { activity },
  } = location;
  console.log(activity);
  const {
    name,
    achievement_count,
    pr_count,
    total_elevation_gain,
    segment_efforts,
  } = activity;

  useEffect(() => {}, []);

  return (
    <Layout location={location}>
      <div>
        <div className="flex gap-x-2 mb-3">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </button>

          <h1>
            <span className="text-green-900 font-bold lowercase">{name}</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <StatTile
            title="total elevation gain"
            stat={`${total_elevation_gain}m`}
            width="w-1/2"
            flex="flex-1"
          />
          <StatTile
            title="achievements"
            stat={achievement_count}
            width="w-1/2"
            flex="flex-1"
          />
          <StatTile title="personal records" stat={pr_count} width="w-full" />
          {segment_efforts.map((seg, index) => {
            const {
              pr_rank,
              name,
              distance,
              elapsed_time,
              average_watts,
              segment,
            } = seg;
            if (pr_rank === 1) {
              console.log(seg);
              return (
                <div
                  className="flex-col w-full mb-3 bg-green-50 p-3"
                  key={index}
                >
                  <p className="uppercase text-sm text-green-900 font-medium mb-2">
                    {name}
                  </p>
                  <div className="flex">
                    <p className="mr-3">
                      <span className="uppercase text-xs">distance </span>
                      <span className="font-spline">
                        {(distance / 1000).toFixed(2)}
                      </span>
                      km
                    </p>
                    <p>
                      <span className="uppercase text-xs">time </span>
                      <span className="font-spline">
                        {formatTime(elapsed_time / 60)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="uppercase text-xs">avg watts </span>
                      <span className="font-spline">
                        {Math.floor(average_watts)}
                      </span>
                      w
                    </p>
                  </div>
                  <div>
                    <div className="flex">
                      <p className="mr-3">
                        <span className="uppercase text-xs">elev gain </span>
                        <span className="font-spline">
                          {Math.floor(
                            segment.elevation_high - segment.elevation_low
                          )}
                        </span>
                        m
                      </p>
                      <p>
                        <span className="uppercase text-xs">avg grade </span>
                        <span className="font-spline">
                          {segment.average_grade}
                        </span>
                        %
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ActivityPage;
