export const getLastWeeksDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
};

export const dateToEpoch = (date) => {
  return date.getTime() / 1000;
};

//epoch time in seconds convert to milliseconds
export const expiresAt = (timeInEpoch) => {
  return timeInEpoch * 1000;
};

//
export const formatTime = (minutes) => {
  const duration = Math.floor(minutes * 60);
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};
