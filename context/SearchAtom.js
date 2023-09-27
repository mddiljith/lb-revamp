import { atom } from "recoil";

export const mapState = atom({
  key: "maplocation", // unique ID (with respect to other atoms/selectors)
  default: { source: "", destination: "" },
});
