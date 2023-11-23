//import { getAccessToken } from '../../../services/map/tokenService'

const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
//const accessToken = getAccessToken();
const headers = {
  headers: {
    "Content-Type": "application/json",
<<<<<<< HEAD
    "Authorization": `Bearer 0451bc15-4de4-48c5-a444-e79c7c81dbb8`,
=======
    "Authorization": `Bearer 8eb425f0-f580-47af-8d84-3f90db72c200`,
>>>>>>> dae4950cc154d89ffa73091172b4107b1c212cfd
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
