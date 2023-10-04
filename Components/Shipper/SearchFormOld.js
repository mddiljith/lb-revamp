import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getAddressList } from "@/services/map/search-auto";

function SearchFormOld() {
  const [source, setSource] = useState();
  const [sourceChange, setSourceChange] = useState(false);
  const [destination, setDistination] = useState();
  const [destinationChange, setDestinationChange] = useState(false);
  const [addressList, setAddressList] = useState();

  const query = sourceChange ? source : destination;

  console.log({ query });
  console.log({ destinationChange });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setAddressList([]);
      const result = await getAddressList(query);
      setAddressList(result);
      console.log(result);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  console.log(addressList);
  const onSubmit = () => {
    //1. router push
    //2. put all source destination in the Global context
  };
  return (
    <section className="p-2 bg-neutral-500 rounded-lg">
      <Typography variant="h3" className="py-5 mb-3">
        Book your Truck!
      </Typography>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <Input
          variant="static"
          color="indigo"
          label="Pickup"
          size="lg"
          placeholder="E.g Delhi"
          name="source"
          containerProps={{ className: "relative" }}
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />

        {addressList?.suggestedLocations && sourceChange ? (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white z-20 mt-12"
          >
            {addressList?.suggestedLocations.slice(0, 5).map((item, index) => (
              <h2
                key={item.eLoc}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                // onClick={() => {
                //   onSourceAddressClick(item);
                // }}
              >
                {`${item.placeName} , ${item.placeAddress}`}
              </h2>
            ))}
          </div>
        ) : null}

        <Input
          variant="static"
          color="indigo"
          label="Drop"
          size="lg"
          placeholder="E.g kerala"
          name="destination"
          containerProps={{ className: "relative" }}
          value={destination}
          onChange={(e) => {
            setDistination(e.target.value);
            setDestinationChange(true);
            setSourceChange(false);
          }}
        />

        {addressList?.suggestions && destinationChange ? (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white z-20 mt-26"
          >
            {addressList?.suggestions.map((item, index) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                // onClick={()=>{
                //     onDestinationAddressClick(item)}}
              >
                {`${item.name} , ${item.place_formatted}`}
              </h2>
            ))}
          </div>
        ) : null}

        <Button type="submit" color="deep-purple" className="mt-5">
          <span>Get Quote</span>
        </Button>
      </form>
    </section>
  );
}

export default SearchFormOld;
