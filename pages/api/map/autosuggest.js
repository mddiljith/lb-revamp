const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer b1ab92c4-e634-4949-b006-26ab6986972d",
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
