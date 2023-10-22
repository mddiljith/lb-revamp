import { Button, Typography } from "@material-tailwind/react";
import AutocompleteInput from "./AutocompleteInput";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mapState, showSearchState } from "@/context/SearchAtom";
import { getDirection } from "@/services/map/getDirection";

function SearchForm() {
  const [mapData, setMapData] = useRecoilState(mapState);
  const SetShowSearch = useSetRecoilState(showSearchState);

  const onSubmit = async () => {
    // e.preventDefault();
    const path = await getDirection(mapData.source, mapData.destination);
    // get eloc pass this to global context
    
    SetShowSearch(false);

    //1. router push
    //2. states are updated in global context via component
    //3.get the distance and other details from the map and put in map context
  };
  return (
    <section className="p-2 bg-neutral-500 rounded-lg">
      <Typography variant="h3" className="py-5 mb-3">
        Book your Truck!
      </Typography>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <AutocompleteInput
          label="Pickup"
          name="source"
          placeholder="e.g. Delhi"
        />

        <AutocompleteInput
          label="Drop"
          name="destination"
          placeholder="e.g. Delhi"
        />
        <Button type="submit" color="deep-purple" className="mt-5">
          <span>Get Quote</span>
        </Button>
      </form>
    </section>
  );
}

export default SearchForm;
