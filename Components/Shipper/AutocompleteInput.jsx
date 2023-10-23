import React, { useState } from "react";
import { Card, Input, List, ListItem } from "@material-tailwind/react";
import { getAddressList } from "@/services/map/search-auto";
import { useSetRecoilState } from "recoil";
import { mapState, searchReqState } from "@/context/SearchAtom";

function AutocompleteInput({ label, placeholder, name }) {
  const [value, setValue] = useState({ place: "", field: "" });
  const [selectedItem, setselectedItem] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const setMapLocations = useSetRecoilState(mapState);
  const setSearchReq = useSetRecoilState(searchReqState);

  const handleClick = (item) => {
    setValue((prev) => {
      return {
        ...prev,
        place: item.placeName,
      };
    });

    setMapLocations((prev) => {
      return {
        ...prev,
        [value.field]: item,
      };
    });

    setSearchReq((prev) => {
      return {
        ...prev,
        [value.field]: item.placeName,
      };
    });

    setSuggestions([]);
  };

  const handleSuggestion = async (value) => {
    if (value.length < 3) return;

    setSuggestions([]);
    const result = await getAddressList(value);
    setSuggestions(result);
    console.log(result);
  };

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
        value={value?.place}
        onChange={(e) => {
          e.preventDefault();
          setValue({ place: e.target.value, field: e.target.name });

          handleSuggestion(e.target.value);
        }}
      />

      <List className="">
        <Card>
          {suggestions?.suggestedLocations?.slice(0, 5).map((item) => (
            <ListItem key={item.eLoc} onClick={() => handleClick(item)}>
              {`${item.placeName} , ${item.placeAddress}`}
            </ListItem>
          ))}
        </Card>
      </List>
    </>
  );
}

export default AutocompleteInput;
