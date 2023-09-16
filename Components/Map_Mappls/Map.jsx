import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";

//multiple marker setup

function Map({ position }) {
  let geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { htmlPopup: "noida" },
        geometry: { type: "Point", coordinates: [28.544, 77.5454] },
      },

      {
        type: "Feature",
        properties: { htmlPopup: "kerala" },
        geometry: { type: "Point", coordinates: [position.lat, position.lng] },
      },

      // {
      //   type: "Feature",
      //   properties: { htmlPopup: "delhi" },
      //   geometry: { type: "Point", coordinates: [28.549511, 77.267825] },
      // },
    ],
  };

  const styleMap = { width: "80%", height: "80vh", display: "inline-block" };

  const mapProps = {
    center: [28.633, 77.2194],
    traffic: false,
    zoom: 4,
    geolocation: false,
    clickableIcons: false,
  };

  let mapObject;
  let mapplsClassObject = new mappls();
  let mapplsPluginObject = new mappls_plugin();
  let markerObject;
  let polylineObject;
  let direction_option = {
    Resource: "route_eta",
    annotations: "nodes,congestion",
    map: mapObject,
    start: "28.545,77.545",
    end: {
      label: "India Gate, Delhi",
      geoposition: `11.258,75.795`,
    },
  };
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
        // fitbounds: true,
        // fitboundOptions: { padding: 120, duration: 1000 },
      });

      polylineObject = mapplsClassObject.Polyline({
        map: mapObject,
        path: [
          { lat: 28.55108, lng: 77.26913 },
          { lat: 28.55185, lng: 77.2675 },
          { lat: 28.5519, lng: 77.2675 },
          { lat: 28.55193, lng: 77.2675 },
          { lat: 28.55195, lng: 77.26752 },
          position,
        ],
        strokeColor: "#1e40af",
        fitbounds: true, // make map fit to polyline cordinates
        fitboundOptions: {
          padding: 120,
          duration: 1000,
          maxZoom: 19,
        }, //fitbound options
      });
    });
  });

  return <div id="map" style={styleMap}></div>;
}

export default Map;

//position: { lat: 10.8505, lng: 76.2711 }
