const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export default async function GET(req, res) {
  const { searchtext } = req.query;

  const result = await fetch(
    BASE_URL +
      "?q=" +
      searchtext +
      "&language=en&limit=6&country=in&types=city&session_token=bb1e3bab-087c-460f-a770-4b2e49720295" +
      "&access_token=" +
      process.env.MAPBOX_PUBLIC_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const searchResult = await result.json();

  res.status(200).json(searchResult);
}
