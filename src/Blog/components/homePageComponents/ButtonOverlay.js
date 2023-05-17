import React, { useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const ScrollToTopPopup = () => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="tooltip-scroll-to-top">Scroll to top</Tooltip>}
      show={show}
    >
      <div
        className="d-flex justify-content-end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button size="large" variant="secondary" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faUpLong} />
        </Button>
      </div>
    </OverlayTrigger>
  );
};

export default ScrollToTopPopup;
