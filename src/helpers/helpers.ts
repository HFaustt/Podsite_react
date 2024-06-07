export function formatMilliseconds(milliseconds: number) {
  let totalSeconds = Math.floor(milliseconds / 1000);

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

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

export const currentYear = new Date().getFullYear();
