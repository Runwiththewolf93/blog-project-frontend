import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import Spinner from "./Spinner";
import "leaflet/dist/leaflet.css";

const Map = ({ userProfile, userInfo }) => {
  const position =
    userProfile && userProfile.location && userProfile.location.coordinates
      ? [
          parseFloat(userProfile.location.coordinates.latitude),
          parseFloat(userProfile.location.coordinates.longitude),
        ]
      : null;

  return (
    <div className="map" id="map">
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
    </div>
  );
};

export default Map;
