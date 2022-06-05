import React, { useState, useEffect } from "react";

const Profile = () => {
  //define state
  const [User, setUser] = useState();

  const getData = () => {
    const url = "https://www.strava.com/api/v3/athlete";
    const clientId = 83167;
    const clientSecret = "36073471fd5bf8f963ade25fe5642a5699c0dc4d";
    const token = "c6ec1af1bd27a74fced84a48bd0e1558504bfb52";

    fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //early return
  if (!User) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <header className="flex">
        <div>
          <p>{User.firstname}</p>
          <p>{User.lastname}</p>
        </div>
        <div>
          <p>{User.city}</p>
          <p>{User.country}</p>
        </div>
      </header>
    </div>
  );
};

export default Profile;
