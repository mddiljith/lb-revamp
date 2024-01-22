import AddvehicleForm from "./AddVehicleForm";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography
} from "@material-tailwind/react";
function AddvehicleFormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="h5" variant="h4">
              Create New Truck
            </Typography>
          </DialogHeader>
          <DialogBody>
            <AddvehicleForm/> 
          </DialogBody>
        </div>
      </Dialog>
    </>
  )
}

export default AddvehicleFormDialog;
