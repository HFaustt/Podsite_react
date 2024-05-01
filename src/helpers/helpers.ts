export function formatMilliseconds(milliseconds: number) {
  // Convert milliseconds to seconds
  let totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate hours, minutes, and remaining seconds
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  // Format the time string
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += hours + "h ";
  }
  if (minutes > 0 || hours > 0) {
    formattedTime += minutes + "m ";
  }
  formattedTime += seconds + "s";

  return formattedTime;
}

// Example usage:
const milliseconds = 2255831;
const formattedTime = formatMilliseconds(milliseconds);
console.log(formattedTime); // Output: 0h 37m 35s

//? Use for pagination
// https://api.spotify.com/v1/me/shows?offset=0&limit=20
// const PER_PAGE = 6;
// https://api.spotify.com/v1/me/shows?offset=0&limit=`${PER_PAGE}`
// Rey 1100,00 DZD — Today at 17:51
// (currentPage - 1) * limit
// https://api.spotify.com/v1/me/shows?offset=`${offset}`&limit=`${limit}`
