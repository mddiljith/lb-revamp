import React from "react";
import { mappls, mappls_plugin } from "mappls-web-maps";

//multiple marker setup

function Map({ position, path }) {
  console.log("path", path)
  let geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { htmlPopup: "noida" },
        geometry: { type: "Point", coordinates: [path[0].lat, path[0].lng] },
      },

      {
        type: "Feature",
        properties: { htmlPopup: "kerala" },
        geometry: { type: "Point", coordinates: [path[path.length-1].lat, path[path.length-1].lng] },
      },
    ],
  };

  const styleMap = { width: "80%", height: "80vh", display: "inline-block" };

  const mapProps = {
    center: [28.633, 77.2194],
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
  // let direction_option = {
  //   Resource: "route_eta",
  //   annotations: "nodes,congestion",
  //   map: mapObject,
  //   start: "28.545,77.545",
  //   end: {
  //     label: "India Gate, Delhi",
  //     geoposition: `11.258,75.795`,
  //   },
  // };
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

    //   polylineObject = mapplsClassObject.Polyline({
    //      map: mapObject,
    //      path: [position],
	//      strokeColor: "#1e40af",
    //      fitbounds: true, // make map fit to polyline cordinates
    //      fitboundOptions: {
    //        padding: 120,
    //        duration: 1000,
    //        maxZoom: 19,
    //      }, 
    //      visibility: true//fitbound options
    //    });

       polylineObject = mapplsClassObject.Polyline(
        {
            map: mapObject,
            // path:[
            //   {lat: 12.845155, lng: 77.660212},
            //   {lat: 12.845125, lng: 77.660093},
            //   {lat: 12.845093, lng: 77.659994},
            //   {lat: 12.845121, lng: 77.659282},
            //   {lat: 12.845356, lng: 77.659152},
            //   {lat: 12.846032, lng: 77.658932},
            //   {lat: 12.846527, lng: 77.658735},
            //   {lat: 12.847387, lng: 77.65833},
            //   {lat: 12.847907, lng: 77.658056},
            //   {lat: 12.848428, lng: 77.657905},
            //   {lat: 12.848597, lng: 77.657888},
            //   {lat: 12.848839, lng: 77.657863},
            //   {lat: 12.849152, lng: 77.657825},
            //   {lat: 12.849333, lng: 77.6578},
            //   {lat: 12.849786, lng: 77.657747},
            //   {lat: 12.850065, lng: 77.657698},
            //   {lat: 12.850304, lng: 77.657651},
            //   {lat: 12.850603, lng: 77.657595},
            //   {lat: 12.850879, lng: 77.657534}
            // ]
            path: path
        }
    );
    });
  });

  return <div id="map" style={styleMap}></div>;
}

export default Map;

//position: { lat: 10.8505, lng: 76.2711 }
