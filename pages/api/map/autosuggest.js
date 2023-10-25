const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer b7afd9cd-5d8c-42f3-b734-b0dc9c3e13cd",
  },
};
const fixedParams = "&region=IND&pod=CITY";
export default async function GET(req, res) {
  const searchtext = req.query.query;
  console.log({ searchtext });
  let _url = `${BASE_URL}?query=${searchtext}`;
  const result = await fetch(_url, headers);

  const searchResult = await result.json();

  res.status(200).json(searchResult);
}
