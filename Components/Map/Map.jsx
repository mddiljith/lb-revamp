import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";

//multiple marker setup

function Map({ path }) {
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

  const mapProps = {
    center: [path[0]?.lat, path[0]?.lng],
    traffic: false,
    zoom: 10,
    geolocation: false,
    clickableIcons: false,
  };

  let mapObject;
  let mapplsClassObject = new mappls();
  let mapplsPluginObject = new mappls_plugin();
  let markerObject;
  let polylineObject;
  let points;
  const getPoints = (data) => {
    points = data;
  };

  // Previously used token: 17ad22773438f5b91de7ef095b9aa1dc
  mapplsClassObject.initialize("7fd70b0cf2e27c9d464ef63732d44dff", () => {
    mapObject = mapplsClassObject.Map({ id: "map", properties: mapProps });
    mapObject.on("load", () => {
      //Activites after mapload

      markerObject = mapplsClassObject.Marker({
        map: mapObject,
        position: geoData,
        clusters: true,
      });

      polylineObject = mapplsClassObject.Polyline({
        map: mapObject,
        path: path,
      });
    });
  });

  return <div id="map" style={styleMap}></div>;
}

export default Map;

//position: { lat: 10.8505, lng: 76.2711 }
