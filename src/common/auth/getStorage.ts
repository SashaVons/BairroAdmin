export const getLocalStorage = (name: string) => {
  const gettedItem = localStorage.getItem(name);
  if (gettedItem) {
    return JSON.parse(gettedItem);
  } else {
    return {};
  }
};
