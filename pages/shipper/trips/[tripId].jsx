import React, { useState } from "react";
import { useRouter } from "next/router";
import NavbarMain from "@/Components/ui/NavbarMain";
import { IoCallOutline } from "react-icons/io5";
import { HiMiniCheckCircle, HiExclamationCircle } from "react-icons/hi2";
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
import { useTrip } from "@/hooks/trips/useTrip";
import DeliveryformDailogBox from "@/Components/Shipper/DeliveryformDailogBox";
import { intervalToDuration, formatDuration } from 'date-fns';

const TripDetail = () => {
  // const router = useRouter();
  // const { tripId } = router.query;
  //get price from the searchiD result
  const { isLoading, error, trip, tripStatus } = useTrip();
  const [open, setOpen] = useState(false);
  // const [orderStatus, setOrderStatus] = useState(tripStatus);
  const handleOpen = () => setOpen(!open);
  let duration;
  if(trip){
    const duration_in_minutes = trip[0]?.search_requests?.duration
    duration = intervalToDuration({start: 0, end: duration_in_minutes*1000})
  }
  console.log({trip})
  return (
    <>
      <NavbarMain />
      {isLoading && <div className="flex items-center justify-center h-screen bg-gray-100" >
        <Spinner />
      </div>}
      {trip && (
        <>
          <Typography variant="h3" color="blue-gray" className="px-4 py-4">
            Tracking ID: #{trip[0]?.tracking_id}
          </Typography>
          <div className="flex flex-row justify-start ml-2">
            <div className="w-3/5 flex flex-col p-2">
              <Card className="w-full bg-gray-100 rounded-none">
                <CardBody>
                  <Timeline>
                    <TimelineItem>
                      <TimelineConnector />
                      <TimelineHeader className="h-3">
                        <TimelineIcon>
                          <HiMiniCheckCircle />
                        </TimelineIcon>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="leading-none"
                        >
                          Paymet Confirmed
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
                        <TimelineIcon>
                          {tripStatus === "inprogress" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "Active" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "Intransit" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "completed" ? (
                            <HiMiniCheckCircle />
                          ) : (
                            <HiExclamationCircle />
                          )}
                        </TimelineIcon>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="leading-none"
                        >
                          Truck Assigned
                        </Typography>
                      </TimelineHeader>
                      <TimelineBody className="pb-8">
                        <Typography
                          variant="small"
                          color="gary"
                          className="font-normal text-gray-600"
                        >
                          Driver Accepted & truck on the way to pickup
                        </Typography>
                      </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineConnector />
                      <TimelineHeader className="h-3">
                        <TimelineIcon>
                          {tripStatus === "Active" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "Intransit" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "completed" ? (
                            <HiMiniCheckCircle />
                          ) : (
                            <HiExclamationCircle />
                          )}
                        </TimelineIcon>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="leading-none "
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
                        <TimelineIcon>
                          {tripStatus === "Intransit" ? (
                            <HiMiniCheckCircle />
                          ) : tripStatus === "completed" ? (
                            <HiMiniCheckCircle />
                          ) : (
                            <HiExclamationCircle />
                          )}
                        </TimelineIcon>
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
                        <TimelineIcon>
                          {tripStatus === "completed" ? (
                            <HiMiniCheckCircle />
                          ) : (
                            <HiExclamationCircle />
                          )}
                        </TimelineIcon>
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
                          Your consignment sucessfullly delivered at
                          destination. POD can be download under trips.
                        </Typography>
                      </TimelineBody>
                    </TimelineItem>
                  </Timeline>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="p-2">
                    <Button color="blue" onClick={handleOpen}>
                      Add delivery contact information
                    </Button>
                    <DeliveryformDailogBox
                      open={open}
                      handler={handleOpen}
                      onSubmit={handleOpen} // need to change this as per API call
                    />
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
              <Card className="bg-gray-100 rounded-none">
                <CardBody>
                  <div className="flex flex-col gap-5">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      {trip[0]?.search_requests?.source} &rarr;{" "}
                      {trip[0]?.search_requests?.destination}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="leading-none"
                    >
                      Estimated Arrival : {duration?.days}d : {duration?.hours}h : {duration?.minutes}m
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="leading-none"
                    >
                      Amount : {trip[0]?.search_requests.payments[0].price}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-gray-100 mt-3 rounded-none">
                <CardBody>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="leading-none mb-3"
                  >
                    Transporter Details
                  </Typography>
                  <Typography>
                    Vehicle number: <em>{trip[0]?.vehicles.plate_number}</em>{" "}
                  </Typography>
                  <Typography>
                    Driver Name: <em>{trip[0]?.vehicles?.users?.name}</em>
                  </Typography>
                  <Typography>Contact Number:</Typography>
                  <Typography>
                    Truck Details: <em>{trip[0]?.vehicles?.model}</em>
                  </Typography>
                </CardBody>
              </Card>
              <Card className="mt-3 rounded-none">
                <CardBody className="mt-9">
                  <ButtonGroup variant="outlined" size="md" color="blue">
                    <Button>Download Invoice</Button>
                    <Button>Download POD </Button>
                  </ButtonGroup>
                </CardBody>
                <CardFooter>
                  <Button className="flex items-center gap-3">
                    <IoCallOutline /> customer care
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TripDetail;
