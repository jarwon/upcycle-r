export const getLastWeeksDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
};

export const dateToEpoch = (date) => {
  return date.getTime() / 1000;
};
