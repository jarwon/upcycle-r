import React, { useState, useEffect } from "react";
import { getAthlete } from "../../utilities/strava";

const Profile = () => {
  const [user, setUser] = useState();
  const [ftpToggle, setFtpToggle] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const res = await getAthlete();
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
    <div>
      <header className="flex lowercase">
        {user && (
          <>
            <div className="mr-3">
              <img src={user.profile} />
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
    </div>
  );
};

export default Profile;
