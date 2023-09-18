import Map from "@/Components/Map_Mappls/Map";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@material-tailwind/react";

function MapView() {
  const { isLoading, position, error, getPosition } = useGeolocation();
  let searchResult = [];
  console.log(position);

  async function getCordinates() {
    const _url = "http://localhost:3000/api/map/direction"
    const result = await fetch(_url, {});

    searchResult = await result.json();
    console.log({searchResult});
  }

  return (
    <>
      <p> MAP </p>
      {!isLoading && position && (
        <div className="h-1/2 w-1/2">
          <Map position={position} path={searchResult} />
        </div>
      )}

      <Button onClick={getCordinates}>get cordinates</Button>
      <Button onClick={getPosition}>get location</Button>
    </>
  );
}

export default MapView;
