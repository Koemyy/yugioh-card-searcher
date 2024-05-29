export const fetchCards = async () => {
  const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
  const data = await response.json();
  return data.data;
};
