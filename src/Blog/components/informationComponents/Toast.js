import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import moment from "moment";
import Spinner from "../Spinner";

const ToastComponent = ({ locationIpAddress, locationIsVpn }) => {
  const [showToast, setShowToast] = useState(true);
  const handleClose = () => setShowToast(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return !locationIpAddress ? (
    <Spinner />
  ) : (
    <Toast
      className="d-inline-block mb-3"
      show={showToast}
      onClose={handleClose}
    >
      <Toast.Header>
        <strong className="me-auto">System Message</strong>
        <small className="align-self-end">
          {moment().format("MMMM Do YYYY, h:mm:ss a")}
        </small>
      </Toast.Header>
      <Toast.Body>
        {`Your location IP address is ${locationIpAddress}, and you ${
          locationIsVpn ? "are" : "are not"
        } using a VPN.`}{" "}
        {`${!locationIsVpn && "Purchase our VPN today!"}`}
      </Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
