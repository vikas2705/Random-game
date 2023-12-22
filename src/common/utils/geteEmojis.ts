export const getEmojis = () => {
  return [
    ":)",
    ":(",
    ":D",
    ":/",
    ":*",
    ":'(",
    ":p",
    ":]",
    ":)",
    ":(",
    ":D",
    ":/",
    ":*",
    ":'(",
    ":p",
    ":]",
  ];
};

export const getEmojisInRandomOrder = () => {
  const emojisList = [...getEmojis()];
  const randomList = emojisList.sort(() => Math.random() - 0.5);
  /* while (emojisList.length > 0) {
    const index = Math.floor(Math.random() * 16);
  }*/

  return randomList;
};
