const BASE_URL = "https://apis.mapmyindia.com/advancedmaps/v1";
const headers = {
  headers: {
    "Content-Type": "application/json",
    //"Authorization": "Bearer 0e2f2d2b-d328-485b-afc3-060bec89622a"
  },
}
const fixedParams = "/17ad22773438f5b91de7ef095b9aa1dc/route_eta/driving/77.227434,28.610981;77.212021,28.616679?alternatives=false&geometries=polyline&overview=simplified&exclude=&steps=true&region=ind"
export default async function GET(req, res) {
  const searchtext = req.query.query;
  let _url = `${BASE_URL}${fixedParams}`;
  const result = await fetch(_url, headers);

  const searchResult = await result.json();
  const searchResultData = [];
  searchResult.routes[0].legs[0].steps.map((step) => {
    step.intersections.map((intersection) => {

      let locArr = {
        lat: intersection.location[1],
        lng: intersection.location[0]
      }

      searchResultData.push(locArr);
    })
  })
  console.log('Search result', searchResultData);
  res.status(200).json(searchResultData);
}
