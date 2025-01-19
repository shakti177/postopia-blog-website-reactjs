export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate;
  } catch (error) {
    return "Invalid Date";
  }
}
