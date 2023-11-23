const BASE_URL = "https://apis.mapmyindia.com/advancedmaps/v1";
const headers = {
  headers: {
    "Content-Type": "application/json",
    //"Authorization": "Bearer 0e2f2d2b-d328-485b-afc3-060bec89622a"
  },
};
//const fixedParams = "/17ad22773438f5b91de7ef095b9aa1dc/route_eta/driving/72.8826,19.0728;74.123996,15.29932?alternatives=false&geometries=polyline&overview=simplified&exclude=&steps=true&region=ind"

export default async function GET(req, res) {
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  const eloc1 = req.query.source;
  const eloc2 = req.query.destination;
  const fixedParams = `/17ad22773438f5b91de7ef095b9aa1dc/route_adv/driving/${eloc1};${eloc2}?alternatives=true&rtype=0&geometries=polyline&overview=full&exclude=&steps=true&region=ind`;

  let _url = `${BASE_URL}${fixedParams}`;
  const result = await fetch(_url, headers);

  const searchResult = await result.json();
  const searchResultData = {path: []};
  let directionResponse = {
    duration: searchResult.routes[0].duration,
    distance: searchResult.routes[0].distance
  }
  console.log({directionResponse});
  searchResult.routes[0].legs[0].steps.map((step) => {
    step.intersections.map((intersection) => {
      searchResultData.path.push({
        lat: intersection.location[1],
        lng: intersection.location[0],
      });
    });
  });

  res.status(200).json({...directionResponse, ...searchResultData});
}
