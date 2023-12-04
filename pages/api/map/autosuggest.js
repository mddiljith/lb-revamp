//import { getAccessToken } from '../../../services/map/tokenService'

const BASE_URL = "https://atlas.mappls.com/api/places/search/json";
const fixedParams = "&region=IND&pod=CITY";

export default async function GET(req, res) {
  res.setHeader(
    "Cache-Control",
    "public",
    "s-maxage=10",
    "stale-while-revalidate=59"
  );
  const searchtext = req.query.query;
  const mapToken = req.headers['x-map-token']
  
  try {
    const autocompleteData = await fetchAutocompleteData(searchtext, mapToken)
    if (autocompleteData.status == 401) {
      throw new Error(autocompleteData)
    } else {
      res.status(200).json(autocompleteData);
    }
  } catch (error) {
    console.log({error})
    if (error.status === 401) {
      try {
        const newToken = await refreshToken()
        const autocompleteData = await fetchAutocompleteData(searchtext, newToken)
        await updateMapToken(newToken);
        res.status(200).json(autocompleteData);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        res.status(500).json({ error: "Error refreshing token" });
      }
    } else {
      console.error("Autocomplete error:", error);
      res.status(500).json({ error: "Autocomplete error" });
    }
  }
}

async function fetchAutocompleteData(search, token) {
  console.log(":::fetchAutocompleteData")
  let _url = `${BASE_URL}?query=${search}`;
  const requestParams = {
    headers: {
      "Content-Type": "application/json",
      //"Authorization": `Bearer ${token}`,
      "Authorization": `Bearer ca92867d-9f82-457c-9265-d331eaf1cba5`,
    },
  }
  const data = await fetch(_url, requestParams)
                .then((response) => {
                  return response.json()
                })

  console.log(':::fetchAutocompleteData Finished', data)
  return data
}

async function refreshToken() {
  console.log(":::refreshToken")

  const tokenRequestBody = {
    'grant_type': 'client_credentials',
    'client_id': '33OkryzDZsKQgUZOhY9rLY3JOsy_8VYy59GHEUSyC07x2GeaxOn8Ynt7FcITT8u9YUWqI_3VO6bplpRBqphPRg==',
    'client_secret': 'lrFxI-iSEg_AL9sYtJo6XedufJKlBpHQmnOpVZiOo99u4QICrfX2rDkC9r5GGe1BcCt7LSjKPjKAhsZpY75eSjt1PXBSVB2n'
  }
  
  const tokenParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    body: new URLSearchParams(tokenRequestBody).toString(),
  }

  const data = await fetch('https://outpost.mapmyindia.com/api/security/oauth/token', tokenParams)
                .then((response) => {
                  return response.json()
                })
  console.log(':::refreshToken Finished', data)

  return data.access_token
}

async function updateMapToken(token) {
  requestParams = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      map_token: token
    }
  }
}