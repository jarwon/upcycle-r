import React, { useState, useEffect, useContext } from "react";
import { getAthlete } from "../../utilities/strava";
import { authContext } from "../context/provider";

const Profile = ({ margin, profilePicSize }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const { makeStravaRequest } = useContext(authContext);

  const getData = async () => {
    try {
      const res = await makeStravaRequest("GET", getAthlete);
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const calcWKg = () => {
    return `${(user.ftp / user.weight).toFixed(2)} w/kg`;
  };

  return (
    <header className={`flex lowercase text-sm ${margin}`}>
      {user && (
        <>
          <div className={`mr-3 ${profilePicSize}`}>
            <img src={user.profile} alt="profile photo" />
          </div>
          <div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>
              {user.city}, {user.country}
            </p>
            <p>
              {user.weight}kg, {(user.weight * 2.205).toFixed(0)}lbs
            </p>
            <p className="font-bold">
              {user.ftp}W, {calcWKg()}
            </p>
          </div>
        </>
      )}
    </header>
  );
};

export default Profile;
