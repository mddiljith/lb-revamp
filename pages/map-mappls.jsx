import Map from "@/Components/Map/Map";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

function MapView() {
  const { isLoading, position, error, getPosition } = useGeolocation();
  const [path, setPath] = useState([]);

  console.log(position);

  async function getCordinates() {
    const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/map/direction`;
    const result = await fetch(_url, {});
    //http://localhost:3000/api/map/direction?source=eloc1&destination=eloc2
    setPath(await result.json());
  }

  return (
    <>
      <p> MAP </p>
      {!isLoading && position && (
        <div className="h-1/2 w-1/2">
          <Map position={position} path={path} />
        </div>
      )}

      <Button onClick={getCordinates}>get cordinates</Button>
      <Button onClick={getPosition}>get location</Button>
    </>
  );
}

export default MapView;
