import React from "react";
import { useRouter } from "next/router";
import NavbarMain from "@/Components/ui/NavbarMain";
import { IoCallOutline } from "react-icons/io5";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Spinner,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { PriceState } from "@/context/SearchAtom";
import { useTrip } from "@/hooks/trips/useTrip";

const TripDetail = () => {
  // const router = useRouter();
  // const { tripId } = router.query;
  //get price from the searchiD result
  const { isLoading, error, trip } = useTrip();
  // const price = useRecoilValue(PriceState);
  const source = trip[0]?.search_requests?.source
  const destination = trip[0]?.search_requests?.destination
  const price = trip[0]?.payments?.price

  return (
    <>
      <NavbarMain />
      {isLoading && <Spinner />}
      <Typography variant="h3" color="blue-gray" className="p-4">
        consignment ID:
      </Typography>
      <div className="flex flex-row justify-start ml-3">
        <div className="w-3/5 flex flex-col p-2">
          <Card className="mt-5 w-5/6 bg-gray-100">
            <CardBody>
              <Timeline>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader className="h-3">
                    <TimelineIcon />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      Order Accepted
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      variant="small"
                      color="gary"
                      className="font-normal text-gray-600"
                    >
                      Order is Accepted in our books awaiting for the driver
                      confirmation
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader className="h-3">
                    <TimelineIcon />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      Truck Arrived for pickup
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      variant="small"
                      color="gary"
                      className="font-normal text-gray-600"
                    >
                      Consignment under pickup, driver have verified the
                      documents. Click here to view the shipping documents
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader className="h-3">
                    <TimelineIcon />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      In-transit
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      variant="small"
                      color="gary"
                      className="font-normal text-gray-600"
                    >
                      you can track the vehicle under tracking tab
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
                <TimelineItem>
                  <TimelineHeader className="h-3">
                    <TimelineIcon />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      Delivered
                    </Typography>
                  </TimelineHeader>
                  <TimelineBody className="pb-8">
                    <Typography
                      variant="small"
                      color="gary"
                      className="font-normal text-gray-600"
                    >
                      Your consignment sucessfullly delivered at destination.
                      POD can be download under trips.
                    </Typography>
                  </TimelineBody>
                </TimelineItem>
              </Timeline>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="p-2">
                <Button color="blue">Add delivery contact information</Button>
              </div>

              <div className="flex gap-3 justify-between p-2 mt-2">
                <Button>Track</Button>
                <Button>Upload documents</Button>
                <Button>Cancel Order</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-2/6 m-2">
          <Card className="bg-gray-100">
            <CardBody>
              <div className="flex flex-col gap-5">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  {source} &rarr; {destination}
                </Typography>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Estimated Arrival :
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="leading-none"
                >
                  Amount : {price}
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gray-100 mt-3">
            <CardBody>
              <Typography
                variant="h6"
                color="blue-gray"
                className="leading-none"
              >
                Transporter Details
              </Typography>
              <Typography>Owned by:</Typography>
              <Typography>Vehicle number:</Typography>
              <Typography>Driver Name:</Typography>
              <Typography>Contact Number:</Typography>
              <Typography>Truck Details:</Typography>
            </CardBody>
          </Card>
          <Card className=" mt-3">
            <CardBody>
              <ButtonGroup variant="outlined" size="md" color="blue">
                <Button>Download Invoice</Button>
                <Button>Download POD </Button>
              </ButtonGroup>
            </CardBody>
            <CardFooter>
              <Button className="flex items-center gap-3">
                <IoCallOutline /> customer care
              </Button>
              <IoCallOutline />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
export default TripDetail;
