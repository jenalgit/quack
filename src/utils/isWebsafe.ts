const websafeFonts = [
  "Georgia",
  "Palatino Linotype",
  "Book Antiqua",
  "Times New Roman",
  "Times",
  "Arial",
  "Helvetica",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Lucida Grande",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
  "Courier New",
  "Lucida Console"
];

export function isWebsafe(font: string) {
  return websafeFonts.includes(font);
}
