import { atom, selector } from "recoil";

export const createVehicleState = atom({
  key: "truckState",
  default: {
    model: "",
    model_year: "",
    plate_number: "",
    truck_type: "",
    status_id: "",
    rc_photo: "",
    vehicle_photo: "",
    owner_id: "",
  },
});
