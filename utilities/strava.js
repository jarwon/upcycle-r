const options = {
  method: "GET",
  headers: { Authorization: `Bearer ${process.env.STRAVA_API_ACCESS_TOKEN}` },
  // headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
};

export const login = async (code) => {
  const res = await fetch(
    `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_API_CLIENT_ID}&redirect_uri=http://localhost:8000/auth&response_type=${code}&scope=activity:read_all,profile:read_all`
  );
};

export const exchangeToken = async (code) => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/oauth/token?client_id=${process.env.STRAVA_API_CLIENT_ID}&client_secret=${process.env.STRAVA_API_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
    {
      ...options,
      method: "POST",
    }
  );
  return res;
};

export const getAccessToken = async (refreshToken) => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/oauth/token?client_id=${process.env.STRAVA_API_CLIENT_ID}&client_secret=${process.env.STRAVA_API_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    {
      ...options,
      method: "POST",
    }
  );
  return res;
};

export const getZones = async (id) => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/activities/${id}/zones`,
    options
  );
  return res;
};

export const getActivities = async (searchParams) => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/athlete/activities?` +
      new URLSearchParams(searchParams).toString(),
    options
  );
  return res;
};

// export const getActivitiesWithId = async (searchParams) => {
//   const res = await fetch(
//     `${process.env.STRAVA_API_URL}/athlete/activities?` +
//       new URLSearchParams(searchParams).toString(),
//     options
//   );
//   const data = await res.json();
//   return data;
// };

export const getActivity = async (id) => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/activities/${id}`,
    options
  );
  // const data = await res.json();
  // return data;
  return res;
};

export const getAthlete = async () => {
  const res = await fetch(`${process.env.STRAVA_API_URL}/athlete`, options);
  // const data = await res.json();
  // return data;
  return res;
};

export const getAthleteZones = async () => {
  const res = await fetch(
    `${process.env.STRAVA_API_URL}/athlete/zones`,
    options
  );
  return res;
};
