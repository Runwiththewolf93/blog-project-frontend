import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Spinner from "../Spinner";
import axios from "axios";

const Holiday = ({ locationData }) => {
  const [holidayData, setHolidayData] = useState([]);
  const year = 2023;

  useEffect(() => {
    axios
      .get(
        `https://date.nager.at/api/v3/publicholidays/${year}/${locationData.country_code}`
      )
      .then(({ data }) => setHolidayData(data));
  }, [locationData.country_code]);

  return !holidayData ? (
    <Spinner />
  ) : (
    <>
      <h3>A list of all the holidays at destination:</h3>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Local Name</th>
            <th>Date</th>
            <th>Country Code</th>
            <th>Fixed</th>
            <th>Global</th>
            <th>Counties</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {holidayData.map((holiday, idx) => (
            <tr key={idx}>
              <td>{holiday.name}</td>
              <td>{holiday.localName}</td>
              <td>{holiday.date}</td>
              <td>{holiday.countryCode}</td>
              <td>{holiday.fixed ? "Yes" : "No"}</td>
              <td>{holiday.global ? "Yes" : "No"}</td>
              <td>
                {holiday.counties && holiday.counties.length > 8
                  ? holiday.counties.slice(0, 8).join(", ") + "..."
                  : holiday.counties
                  ? holiday.counties.join(", ")
                  : `${locationData.country_code}`}
              </td>
              <td>{holiday.types.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Holiday;

// const apiKey = process.env.REACT_APP_ABSTRACT_HOLIDAY_API_KEY;
// `https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=${locationData.country_code}`
