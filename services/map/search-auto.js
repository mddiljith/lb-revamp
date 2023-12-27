export const getAddressList = async (query, mapToken) => {
  const {map_token} = mapToken
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/map/autosuggest?query=${query}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Map-Token": map_token,
    },
  });

  const result = await res.json();
  return result;
};