//import { getAccessToken } from '../../../services/map/tokenService'

const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
//const accessToken = getAccessToken();
const headers = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer 8eb425f0-f580-47af-8d84-3f90db72c200`,
  },
};
const fixedParams = "&region=IND&pod=CITY";
export default async function GET(req, res) {
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  const searchtext = req.query.query;
  let _url = `${BASE_URL}?query=${searchtext}`;
  const result = await fetch(_url, headers);

  const searchResult = await result.json();

  res.status(200).json(searchResult);
}
