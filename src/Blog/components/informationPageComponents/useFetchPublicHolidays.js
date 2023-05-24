// useFetchPublicHolidays.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPublicHolidays = (countryCode, year) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPublicHolidays = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicHolidays();
  }, [countryCode, year]);

  return { loading, error, data };
};

export default useFetchPublicHolidays;
