export function time(value) {
  const unixTimestamp = value;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unixTimestamp * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = `${date.getMinutes()}`;

  // Will display time in 10:30:23 format
  /* const formattedTime = `${hours}:${minutes}:${seconds}`; */
  let formattedTime = null;

  // AM / PM
  if (hours <= 12) {
    if (hours === 12) {
      formattedTime = `${hours}:${minutes} PM`;
    } else if (hours < 12) {
      formattedTime = `${hours}:${minutes} AM`;
    }
  } else if (hours >= 13) {
    if (hours === 24) {
      formattedTime = `${hours - 12}:${minutes} AM`;
    } else if (hours < 24) {
      formattedTime = `${hours - 12}:${minutes} PM`;
    }
  }

  return formattedTime;
}

export function currentDate(value) {
  const unixTimestamp = value;

  const date = new Date(unixTimestamp * 1000);
  // use the toLocaleString() method to get the month name from a date in JavaScript.
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const space = " ";

  return `${month}${space}${day}`;
}

console.log(currentDate(1677599614));

// sunrise 1677581867
// sunset 1677624145
// time 1677599614
