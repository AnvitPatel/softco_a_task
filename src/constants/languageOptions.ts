export const languageOptions = [
  {
    value: "English",
    flag: "/assets/img/flags/english.svg",
  },
  {
    value: "Spanish",
    flag: "/assets/img/flags/spanish.svg",
  },
  {
    value: "German",
    flag: "/assets/img/flags/german.svg",
  },
  {
    value: "Japanese",
    flag: "/assets/img/flags/japanese.svg",
  },
  {
    value: "French",
    flag: "/assets/img/flags/french.svg",
  },
];

export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  const uniqueId = `${timestamp}-${random}`;
  return uniqueId;
};
