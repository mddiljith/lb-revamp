import { atom } from "recoil";

export const mapState = atom({
  key: "maplocation", // unique ID (with respect to other atoms/selectors)
  default: { source: "", destination: "" },
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
