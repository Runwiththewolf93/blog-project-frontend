import { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import ToastComponent from "./Toast";
import TabbedInterface from "./TabbedInterface";
import useUnsplashImages from "../../hooks/useUnsplash";

/**
 * Renders the Geolocation component.
 *
 * @param {Object} locationData - The location data object.
 * @param {boolean} isLoadingGeolocation - Indicates if geolocation is loading.
 * @param {string} errorGeolocation - The error message for geolocation.
 * @return {JSX.Element} The rendered Geolocation component.
 */
// Geolocation component
const Geolocation = ({
  locationData,
  isLoadingGeolocation,
  errorGeolocation,
}) => {
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [errorImages, setErrorImages] = useState(null);

  const images = useUnsplashImages(
    locationData.city,
    12,
    setIsLoadingImages,
    setErrorImages
  );

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
          <TabbedInterface
            {...{
              locationData,
              images,
              isLoadingGeolocation,
              isLoadingImages,
              errorGeolocation,
              errorImages,
            }}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Geolocation;
