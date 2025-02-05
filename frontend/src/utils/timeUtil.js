export function getFormattedTime(dateString) {
  try {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${amPm}`;
  } catch (error) {
    return "Invalid Time";
  }
}
