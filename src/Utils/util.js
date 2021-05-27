let lastDate = new Date();

export const log = (message) => {
  const currentDate = new Date();
  const seconds = (currentDate.getTime() - lastDate.getTime()) / 1000;
  if (seconds >= 1) {
    console.log(message);
    lastDate = currentDate;
  }
};
