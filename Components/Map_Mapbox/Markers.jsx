import React from "react";
import { Marker } from "react-map-gl";

function Markers(sourceCord, destinationCord) {
  return (
    <>
      {sourceCord && (
        <Marker
          longitude={sourceCord?.lng}
          latitude={sourceCord?.lat}
          anchor="bottom"
        />
      )}

      {destinationCord && (
        <Marker
          longitude={destinationCord?.lng}
          latitude={destinationCord?.lat}
          anchor="bottom"
        />
      )}
    </>
  );
}

export default Markers;
