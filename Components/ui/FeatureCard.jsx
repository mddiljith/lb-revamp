import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

function FeatureCard({ title, content }) {
  return (
    <Card>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
        <Typography>{content}</Typography>
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
