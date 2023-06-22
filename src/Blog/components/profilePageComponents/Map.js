import { Card } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Spinner from "../shared/Spinner";
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from "react-responsive";

// Map component
const MapComponent = ({ userProfile, userInfo }) => {
  const position =
    userProfile && userProfile.location && userProfile.location.coordinates
      ? [
          parseFloat(userProfile.location.coordinates.latitude),
          parseFloat(userProfile.location.coordinates.longitude),
        ]
      : null;

  // Use the useMediaQuery hook to check if the screen width is less than 576px
  const isMobileScreen = useMediaQuery({ query: "(max-width: 576px)" });

  return (
    <Card className={`map p-1 ${isMobileScreen && "mb-4"}`} id="map">
      <Card.Title>
        This map shows the current location of{" "}
        {userInfo.name.split(" ")[0] || userProfile.name.first}.
      </Card.Title>
      {!position ? (
        <Spinner />
      ) : (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          {position && (
            <Marker
              position={position}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                {userInfo.name.split(" ")[0] || userProfile.name.first} lives
                here!
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </Card>
  );
};

export default MapComponent;
