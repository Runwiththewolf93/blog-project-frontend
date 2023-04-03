import { useState, useEffect } from "react";
import axios from "axios";

const useGeolocation = apiKey => {
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    const randomIPAddress = Array(4)
      .fill(0)
      .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
      .join(".");

    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${
          randomIPAddress || "93.150.220.174"
        }`
      )
      .then(({ data }) => {
        const {
          continent,
          continent_code,
          postal_code,
          country,
          country_code,
          city,
          region,
          flag,
          currency,
          ip_address,
          latitude,
          longitude,
          security,
          timezone,
          connection,
        } = data;
        setLocationData({
          continent,
          continent_code,
          postal_code: postal_code ? postal_code : "No info",
          country,
          country_code,
          city,
          region,
          png: flag ? flag.png : "",
          currency_code: currency ? currency.country_code : "No info",
          currency_name: currency ? currency.currency_name : "No info",
          ip_address,
          latitude,
          longitude,
          is_vpn: security ? security.is_vpn : false,
          current_time: timezone ? timezone.current_time : "",
          connection,
        });
      })
      .catch(err => console.error(err));
  }, [apiKey]);

  return locationData;
};

export default useGeolocation;
