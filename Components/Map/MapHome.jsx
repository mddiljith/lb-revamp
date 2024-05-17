import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";
import { getDate } from "date-fns";

//multiple marker setup

function MapHome({ position, path }) {
  let geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { htmlPopup: "source" },
        geometry: {
          type: "Point",
          coordinates: [position.lat, position.lng],
        },
      }
    ]
  };
  if(path) {
    feature_map = {
      type: "Feature",
      properties: { htmlPopup: "Destination" },
      geometry: {
        type: "Point",
        coordinates: [path[path.length - 1]?.lat, path[path.length - 1]?.lng],
      }
    }
    getData.features.push(feature_map)
  }

  const styleMap = {
    width: "100%",
    height: "100%",
    display: "inline-block",
    // overflow: "hidden",
  };

  const mapProps = {
    center: [position?.lat, position?.lng],
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

  mapplsClassObject.initialize("17ad22773438f5b91de7ef095b9aa1dc", () => {
    mapObject = mapplsClassObject.Map({ id: "map", properties: mapProps });
    mapObject.on("load", () => {
      //Activites after mapload

      markerObject = mapplsClassObject.Marker({
        map: mapObject,
        position: geoData,
        clusters: true,
      });

      // polylineObject = mapplsClassObject.Polyline({
      //   map: mapObject,
      //   path: path,
      // });
    });
  });

  return <div id="map" style={styleMap}></div>;
}

export default MapHome;

//position: { lat: 10.8505, lng: 76.2711 }
