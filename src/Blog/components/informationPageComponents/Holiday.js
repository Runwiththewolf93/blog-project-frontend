import { Table, Spinner, Alert } from "react-bootstrap";
import useFetchPublicHolidays from "./useFetchPublicHolidays";

const Holiday = ({ locationData, isLoadingGeolocation, errorGeolocation }) => {
  const {
    loading,
    error,
    data: holidayData,
  } = useFetchPublicHolidays(locationData.country_code, 2023);

  if (isLoadingGeolocation || loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (errorGeolocation || error) {
    return (
      <Alert>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{(errorGeolocation || error).message}</p>
      </Alert>
    );
  }

  return !holidayData || holidayData.length === 0 ? (
    <p>No holidays found</p>
  ) : (
    <div className="vh-100 mt-5">
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
    </div>
  );
};

export default Holiday;
