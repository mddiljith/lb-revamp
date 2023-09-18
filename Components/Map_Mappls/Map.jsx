import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";

//multiple marker setup

function Map({ position, path }) {
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
    {
        "lat": 28.611048,
        "lng": 77.227426
    },
    {
        "lat": 28.610991,
        "lng": 77.227097
    },
    {
        "lat": 28.611051,
        "lng": 77.227028
    },
    {
        "lat": 28.611707,
        "lng": 77.227615
    },
    {
        "lat": 28.614253,
        "lng": 77.22779
    },
    {
        "lat": 28.614992,
        "lng": 77.22736
    },
    {
        "lat": 28.615307,
        "lng": 77.226798
    },
    {
        "lat": 28.616194,
        "lng": 77.22526
    },
    {
        "lat": 28.616095,
        "lng": 77.224963
    },
    {
        "lat": 28.616392,
        "lng": 77.224729
    },
    {
        "lat": 28.616487,
        "lng": 77.222799
    },
    {
        "lat": 28.616498,
        "lng": 77.222593
    },
    {
        "lat": 28.616515,
        "lng": 77.222263
    },
    {
        "lat": 28.616536,
        "lng": 77.221846
    },
    {
        "lat": 28.61656,
        "lng": 77.221372
    },
    {
        "lat": 28.616575,
        "lng": 77.221074
    },
    {
        "lat": 28.616602,
        "lng": 77.220577
    },
    {
        "lat": 28.61661,
        "lng": 77.220374
    },
    {
        "lat": 28.616621,
        "lng": 77.220112
    },
    {
        "lat": 28.61663,
        "lng": 77.21988
    },
    {
        "lat": 28.616644,
        "lng": 77.219495
    },
    {
        "lat": 28.616654,
        "lng": 77.219198
    },
    {
        "lat": 28.616658,
        "lng": 77.219096
    },
    {
        "lat": 28.616609,
        "lng": 77.218864
    },
    {
        "lat": 28.61653,
        "lng": 77.218759
    },
    {
        "lat": 28.616547,
        "lng": 77.218587
    },
    {
        "lat": 28.616623,
        "lng": 77.218514
    },
    {
        "lat": 28.616709,
        "lng": 77.218222
    },
    {
        "lat": 28.616718,
        "lng": 77.217933
    },
    {
        "lat": 28.616765,
        "lng": 77.216978
    },
    {
        "lat": 28.616774,
        "lng": 77.216798
    },
    {
        "lat": 28.616797,
        "lng": 77.216366
    },
    {
        "lat": 28.616809,
        "lng": 77.216132
    },
    {
        "lat": 28.616839,
        "lng": 77.215559
    },
    {
        "lat": 28.616844,
        "lng": 77.215462
    },
    {
        "lat": 28.616868,
        "lng": 77.214995
    },
    {
        "lat": 28.616881,
        "lng": 77.214744
    },
    {
        "lat": 28.616904,
        "lng": 77.214303
    },
    {
        "lat": 28.616914,
        "lng": 77.214106
    },
    {
        "lat": 28.616921,
        "lng": 77.213973
    },
    {
        "lat": 28.616966,
        "lng": 77.212896
    },
    {
        "lat": 28.616975,
        "lng": 77.212757
    },
    {
        "lat": 28.616633,
        "lng": 77.212439
    },
    {
        "lat": 28.616636,
        "lng": 77.212234
    },
    {
        "lat": 28.61672,
        "lng": 77.21206
    },
    position
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
