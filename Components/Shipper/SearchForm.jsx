import { Button, Typography } from "@material-tailwind/react";
import AutocompleteInput from "./AutocompleteInput";

function SearchForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    //1. router push
    //2. put all source destination in the Global context
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
