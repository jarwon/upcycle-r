const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${
      typeof window !== "undefined" &&
      window.localStorage.getItem("access_token")
        ? JSON.parse(localStorage.getItem("access_token"))
        : null
    }`,
  },
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

export const getAccessTokenEndpoint = (refreshToken) => {
  return `${process.env.STRAVA_API_URL}/oauth/token?client_id=${process.env.STRAVA_API_CLIENT_ID}&client_secret=${process.env.STRAVA_API_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`;
};

export const getZones = (id) => {
  return `${process.env.STRAVA_API_URL}/activities/${id}/zones`;
};

export const getActivities = (searchParams) => {
  return (
    `${process.env.STRAVA_API_URL}/athlete/activities?` +
    new URLSearchParams(searchParams).toString()
  );
};

export const getActivity = (id) => {
  return `${process.env.STRAVA_API_URL}/activities/${id}?include_all_efforts=`;
};

export const getAthlete = `${process.env.STRAVA_API_URL}/athlete`;

export const athleteZonesEndpoint = `${process.env.STRAVA_API_URL}/athlete/zones`;

export const getEquipment = (id) => {
  return `${process.env.STRAVA_API_URL}/gear/${id}`;
};
