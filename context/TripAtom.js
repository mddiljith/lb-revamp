import { atom } from "recoil";

export const tripState = atom({
  key: "pickup_maplocation", // unique ID (with respect to other atoms/selectors)
  default: {
    source: "", //taken from search locatoin api, eloc is inside
    destination: "", //taken from search locatoin api, eloc is inside
    distance: "", //calculated while loading the map
    duration: "", //calculated while loading the map
    route_path: "", //calculated while loading the map
  },
});