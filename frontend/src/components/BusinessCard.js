import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

/** Simple UI Card thay displays all informations needed about one business card */
const MyCard = ({user}) => {
  return (
    <div className="my-1">
      <Card className="col-lg-4 m-auto">
        <CardBody>
          <CardTitle tag="h5">Business card - {user.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{user.email}</CardSubtitle>
          <CardText>Currently working in : {user.company}</CardText>
          <CardText>Contact : {user.telephone}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyCard;