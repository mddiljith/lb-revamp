import fetch from 'isomorphic-unfetch'; // Use 'isomorphic-unfetch' for server-side and client-side fetching
const fs = require('fs');
const yaml = require('js-yaml');

let accessToken = null;
const yamlFilePath = 'applConfig.yaml'

// Function to retrieve an access token
export const getAccessToken = async () => {
  const yamlData = fs.readFileSync(yamlFilePath, 'utf8');
  const applConfig = yaml.load(yamlData);
  const apiUrl = applConfig.api.mappls.token_api.url;
  const grant_type = applConfig.api.mappls.token_api.grant_type
  const client_id = applConfig.api.mappls.token_api.client_id
  const client_secret = applConfig.api.mappls.token_api.client_secret

  if (!accessToken) {
    // Fetch a new access token from Mappls API
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // body: JSON.stringify({ 
      //   'grant_type': `${grant_type}`,
      //   'client_id': `${client_id}`,
      //   'client_secret': `${client_secret}` 
      // }),
      body: JSON.stringify({ 
        'grant_type': 'client_credentials',
        'client_id': '33OkryzDZsKQgUZOhY9rLY3JOsy_8VYy59GHEUSyC07x2GeaxOn8Ynt7FcITT8u9YUWqI_3VO6bplpRBqphPRg==',
        'client_secret': 'lrFxI-iSEg_AL9sYtJo6XedufJKlBpHQmnOpVZiOo99u4QICrfX2rDkC9r5GGe1BcCt7LSjKPjKAhsZpY75eSjt1PXBSVB2n' 
      }),
    })
    .then((response) => {
      if (response.status == 200) {
        const data = response.json();
        accessToken = data.accessToken;
      } else if(response.status == 401) {
        console.log("Unauthorized")
      } else {
        console.log("Something went wrong")
      }
    })
    .catch((error) => {
      console.log({error});
    });
  }
  return accessToken;
};

// Function to clear the access token (e.g., for logout)
export const clearAccessToken = () => {
  accessToken = null;
};
