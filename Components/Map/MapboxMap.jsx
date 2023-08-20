import React from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "@material-tailwind/react";
import Markers from "./Markers";

function MapboxMap() {
  const { isLoading, position, error, getPosition } = useGeolocation();

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <Button onClick={getPosition}>Get Position</Button>
      <div className="rounded-lg overflow-hidden">
        {position ? (
          <Map
            // ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
            initialViewState={{
              longitude: position?.lng,
              latitude: position?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers sourceCord={position} />
          </Map>
        ) : null}

        {/* {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null} */}
      </div>
      {/* <div className="absolute bottom-[40px]
      z-20 right-[20px]">
     <DistanceTime />
     </div> */}
    </div>
  );
}

export default MapboxMap;
