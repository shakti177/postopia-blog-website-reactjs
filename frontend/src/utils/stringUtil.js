export function getNameInitials(name) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else if (words.length >= 3) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  } else {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
