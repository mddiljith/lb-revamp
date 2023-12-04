//import { getAccessToken } from '../../../services/map/tokenService'

import { callApi } from "@/lib/utils/api";
import { env } from "eslint-config-next";

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
    if (autocompleteData?.error == 'invalid_token') {
      throw new Error(autocompleteData)
    } else {
      res.status(200).json(autocompleteData);
    }
  } catch (error) {
      try {
        const newToken = await refreshToken()
        const autocompleteData = await fetchAutocompleteData(searchtext, newToken)
        await updateMapToken(newToken);
        res.status(200).json(autocompleteData);
      } catch (refreshError) {
        res.status(500).json({ error: "Error refreshing token" });
      }
  }
}

async function fetchAutocompleteData(search, token) {
  let _url = `${BASE_URL}?query=${search}`;
  const requestParams = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }
  const data = await fetch(_url, requestParams)
                .then((response) => {
                  return response.json()
                })

  return data
}

async function refreshToken() {
  const tokenRequestBody = {
    'grant_type': 'client_credentials',
    'client_id': env.prod.MAPPLS_CLIENT_ID,
    'client_secret': env.prod.MAPPLS_CLIENT_SECRET
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

  return data.access_token
}

async function updateMapToken(token) {
  const requestParams = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      map_token: token
    })
  }
  const _url = '/api/map/map_token'
  const responseData = await callApi(_url, requestParams)

}