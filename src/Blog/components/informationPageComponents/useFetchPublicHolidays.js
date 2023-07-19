// useFetchPublicHolidays.js
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetches public holidays for a specific country and year.
 *
 * @param {string} countryCode - The country code for the country of interest.
 * @param {number} year - The year for which public holidays are to be fetched.
 * @return {object} - An object containing the loading state, error message, and fetched data.
 */
const useFetchPublicHolidays = (countryCode, year) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    /**
     * Fetches public holidays from a specified API endpoint.
     *
     * @return {Promise<void>} - A promise that resolves when the public holidays have been fetched.
     */
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
