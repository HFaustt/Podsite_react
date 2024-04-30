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
