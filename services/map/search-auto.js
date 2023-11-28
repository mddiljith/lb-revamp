export const getAddressList = async (query, mapToken) => {
  const {map_token} = mapToken
  const res = await fetch("/api/map/autosuggest?query=" + query, {
    headers: {
      "Content-Type": "application/json",
      "X-Map-Token": map_token,
    },
  });

  const result = await res.json();
  return result;
};