export const getAddressList = async (query) => {
  const res = await fetch("/api/map/search?searchtext=" + query, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();
  return result;
};

//http://localhost:3000/api/map/search?searchtext=banga
