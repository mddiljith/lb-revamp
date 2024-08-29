import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const MapMyIndia = ({path}) => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  let geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { htmlPopup: "source" },
        geometry: { type: "Point", coordinates: [path[0]?.lat, path[0]?.lng] },
      },

      {
        type: "Feature",
        properties: { htmlPopup: "Destination" },
        geometry: {
          type: "Point",
          coordinates: [path[path.length - 1]?.lat, path[path.length - 1]?.lng],
        },
      },
    ],
  };

  const styleMap = { width: "100%", height: "100%", display: "inline-block" };

  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
  };

  useEffect(() => {
    mapplsClassObject.initialize("94e905478b7cbf4122c68e985cd42add", loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [path[0]?.lat, path[0]?.lng],
          zoom: 10,
          traffic: true,
          geolocation: true,
          clickableIcons: true,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);
        let markerObject = mapplsClassObject.Marker({
          map: newMap,
          position: geoData,
          clusters: true,
        });
        let polylineObject = mapplsClassObject.Polyline({
          map: newMap,
          path: path,
        });
      });
      mapRef.current = newMap;
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [])
  
  return (
    <div
      id="map"
      style={styleMap}
    >
      {isMapLoaded}
    </div>
  );
};
export default MapMyIndia;