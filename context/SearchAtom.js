import { atom } from "recoil";

export const mapState = atom({
  key: "maplocation", // unique ID (with respect to other atoms/selectors)
  default: {
    source: "", //taken from search locatoin api, eloc is inside
    destination: "", //taken from search locatoin api, eloc is inside
    distance: "", //calculated while loading the map
    time: "", //calculated while loading the map
    route_path: "", //calculated while loading the map
  },
});

export const searchReqState = atom({
  key: "searchReq", // unique ID (with respect to other atoms/selectors)
  default: {
    source: "",
    destination: "",
    truck_type: "",
    weight: "",
    height: "",
    length: "",
    scheduled_at: "",
    scheduled_time: "",
  }, // default value (aka initial value)
});

export const showSearchState = atom({
  key: "showSearch", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const showTruckSearchState = atom({
  key: "showTruckSearch", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
