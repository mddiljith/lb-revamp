import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";

//multiple marker setup

function Map({ path }) {
  console.log("path", path, [path[0].lat, path[0].lng]);
  let geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { htmlPopup: "source" },
        geometry: { type: "Point", coordinates: [path[0].lat, path[0].lng] },
      },

      {
        type: "Feature",
        properties: { htmlPopup: "Destination" },
        geometry: {
          type: "Point",
          coordinates: [path[path.length - 1].lat, path[path.length - 1].lng],
        },
      },
    ],
  };

  const styleMap = { width: "80%", height: "80vh", display: "inline-block" };

  const mapProps = {
    center: [path[0].lat, path[0].lng],
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
    console.log(data);
    points = data;
    console.log(points);
  };

  mapplsClassObject.initialize("17ad22773438f5b91de7ef095b9aa1dc", () => {
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
