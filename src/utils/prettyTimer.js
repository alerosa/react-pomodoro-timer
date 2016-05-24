const prettyTimer = time => {
  let minutes = Math.floor(time / 60);
  let seconds = time - 60 * minutes;

  minutes = (`00${minutes}`).substr(-2);
  seconds = (`00${seconds}`).substr(-2);

  return `${minutes} : ${seconds}`;
};

export default prettyTimer;
