import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import axios from "axios";
import useGeolocation from "./useGeolocation";
import ToastComponent from "./Toast";

const Geolocation = () => {
  const apiKey = process.env.REACT_APP_ABSTRACT_LOCATION_API_KEY;

  const {
    continent: locationContinent,
    continent_code: locationContinentCode,
    postal_code: locationPostalCode,
    country: locationCountry,
    country_code: locationCountryCode,
    city: locationCity,
    region: locationRegion,
    png: locationPng,
    currency_code: locationCurrencyCode,
    currency_name: locationCurrencyName,
    ip_address: locationIpAddress,
    latitude: locationLatitude,
    longitude: locationLongitude,
    is_vpn: locationIsVpn,
    current_time: locationCurrentTime,
  } = useGeolocation(apiKey);

  console.log(locationIpAddress);

  return (
    <>
      <h3>
        Pick a random spot for your vacation{" "}
        <Badge className="py-1" bg="secondary">
          New
        </Badge>
      </h3>
      <ToastComponent
        locationIpAddress={locationIpAddress}
        locationIsVpn={locationIsVpn}
      />
      <Card>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Subtitle></Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};

export default Geolocation;
