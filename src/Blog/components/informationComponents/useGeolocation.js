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
          flag: { png },
          currency: { currency_code, currency_name },
          ip_address,
          latitude,
          longitude,
          security: { is_vpn },
          timezone: { current_time },
          connection,
        } = data;
        setLocationData({
          continent,
          continent_code,
          postal_code,
          country,
          country_code,
          city,
          region,
          png,
          currency_code,
          currency_name,
          ip_address,
          latitude,
          longitude,
          is_vpn,
          current_time,
          connection,
        });
      })
      .catch(err => console.error(err));
  }, [apiKey]);

  return locationData;
};

export default useGeolocation;
