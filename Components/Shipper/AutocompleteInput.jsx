import React, { useState } from "react";
import { Input, List, ListItem } from "@material-tailwind/react";
import { getAddressList } from "@/services/map/search-auto";
import { useSetRecoilState } from "recoil";
import { mapState, searchReqState } from "@/context/SearchAtom";

function AutocompleteInput({ label, placeholder, name }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const setMapLocations = useSetRecoilState(mapState);
  const setSearcReq = useSetRecoilState(searchReqState);

  const handleClick = (item) => {
    setValue(item.placeName);

    setMapLocations((prev) => {
      return {
        ...prev,
        name: item,
      };
    });

    setSearcReq((prev) => {
      return {
        ...prev,
        name: item.placeName,
      };
    });
  };

  const handleSuggestion = async (value) => {
    if (value.length < 3) return;

    setSuggestions([]);
    const result = await getAddressList(value);
    setSuggestions(result);
    console.log(result);
  };

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(async () => {
  //     setSuggestions([]);
  //     const result = await getAddressList(value);
  //     setSuggestions(result);
  //     console.log(result);
  //   }, 1000);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [value]);
  return (
    <>
      <Input
        variant="static"
        color="indigo"
        label={label}
        size="lg"
        placeholder={placeholder}
        name={name} //name should be same as the context name,ie source or destination
        containerProps={{ className: "relative" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSuggestion(e.target.value);
        }}
      />

      <List className="absolute">
        {suggestions?.suggestedLocations.slice(0, 5).map((item) => (
          <ListItem key={item.eLoc} onClick={() => handleClick(item)}>
            {`${item.placeName} , ${item.placeAddress}`}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default AutocompleteInput;
