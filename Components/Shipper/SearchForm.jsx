import { Button, Typography } from "@material-tailwind/react";
import AutocompleteInput from "./AutocompleteInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  mapState,
  showSearchState,
  showTruckSearchState,
} from "@/context/SearchAtom";
import { getDirection } from "@/services/map/getDirection";
// import { sub } from "date-fns";

function SearchForm() {
  const [mapData, setMapData] = useRecoilState(mapState);
  const SetShowSearch = useSetRecoilState(showSearchState);
  const setshowTruckSearch = useSetRecoilState(showTruckSearchState);

  const onSubmit = async (e) => {
    e.preventDefault();

    let eloc1 = mapData?.source.eLoc;
    let eloc2 = mapData?.destination.eLoc;
    if (eloc1 && eloc2) {
      const mapResult = await getDirection(eloc1, eloc2);
      const { duration, distance, path } = mapResult;
      setMapData((prev) => {
        return {
          ...prev,
          route_path: path,
          duration,
          distance,
          eloc1,
          eloc2
        };
      });
    }
    
    // get eloc pass this to global context

    SetShowSearch(false);
    setshowTruckSearch(true);

    //1. router push
    //2. states are updated in global context via component
    //3.get the distance and other details from the map and put in map context
  };
  return (
    <div className="flex flex-row justify-center bg-white w-full">
      <div className="w-1/2 mt-10">
        <section className="p-8 bg-white">
          <form className="flex flex-col gap-5">
            <AutocompleteInput
              label="Pickup from"
              name="source"
              placeholder="e.g. Delhi"
            />

            <AutocompleteInput
              label="Drop at"
              name="destination"
              placeholder="e.g. Delhi"
            />
            <Button onClick={onSubmit} variant="filled" className="mt-5">
              <span>Get Quote</span>
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SearchForm;
