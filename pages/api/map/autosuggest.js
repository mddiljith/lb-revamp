const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
const headers = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 0e2f2d2b-d328-485b-afc3-060bec89622a"
  },
}
const fixedParams = "&region=IND&pod=CITY"
export default async function GET(req, res) {
  const searchtext = req.query.query;
  console.log({searchtext})
  let _url = `${BASE_URL}?query=${searchtext}`;
  const result = await fetch(_url, headers);

  const searchResult = await result.json();

  res.status(200).json(searchResult);
}
