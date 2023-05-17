import { Card, Badge } from "react-bootstrap";
import ToastComponent from "./Toast";
import TabbedInterface from "./TabbedInterface";
import useUnsplashImages from "../../hooks/useUnsplash";

const Geolocation = ({ locationData }) => {
  const images = useUnsplashImages(locationData.city, 12);

  return (
    <>
      <h3>
        Pick a random spot for your vacation{" "}
        <Badge className="py-1" bg="secondary">
          New
        </Badge>
      </h3>
      <ToastComponent
        locationIpAddress={locationData.ip_address}
        locationIsVpn={locationData.is_vpn}
      />
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Based on your recent interests,</Card.Title>
          <Card.Subtitle className="mb-3">
            We suggest the following location:
          </Card.Subtitle>
          <TabbedInterface locationData={locationData} images={images} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Geolocation;
