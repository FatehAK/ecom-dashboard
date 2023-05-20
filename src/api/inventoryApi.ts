const fetchInventory = async () => {
  const response = await fetch(`https://run.mocky.io/v3/ee7b4aab-ad6f-4ed1-9be3-6cab69d8d7c7`);
  if (!response.ok) throw new Error(response.statusText);

  const results = await response.json();
  return results;
};

export default { fetchInventory };
