import Map from "@/Components/Map_Mappls/Map";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@material-tailwind/react";

function MapView() {
  const { isLoading, position, error, getPosition } = useGeolocation();

  console.log(position);

  return (
    <>
      <p> MAP </p>
      {!isLoading && position && (
        <div className="h-1/2 w-1/2">
          <Map position={position} />
        </div>
      )}

      <Button onClick={getPosition}>get location</Button>
    </>
  );
}

export default MapView;
