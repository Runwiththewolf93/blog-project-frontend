import { ProgressBar, Card } from "react-bootstrap";

const Progress = ({ userProfile }) => {
  return (
    <Card>
      <Card.Title>
        {userProfile.name?.first} {userProfile.name?.last} spends most of{" "}
        {userProfile.gender === "male" ? "his" : "her"} time on:
      </Card.Title>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ gap: "0.5rem" }}
      >
        <ProgressBar
          striped
          label="Security Audit Outsourcing"
          variant="danger"
          now={100}
          style={{ height: "120%", fontSize: "1rem" }}
        />
        <ProgressBar
          striped
          label="Debugging"
          variant="light"
          now={80}
          style={{ height: "120%", fontSize: "1rem" }}
        />
        <ProgressBar
          striped
          label="Security Testing"
          variant="warning"
          now={60}
          style={{ height: "120%", fontSize: "1rem" }}
        />
        <ProgressBar
          striped
          label="Product Infrastructure"
          variant="success"
          now={40}
          style={{ height: "120%", fontSize: "1rem" }}
        />
        <ProgressBar
          striped
          label="Network Security"
          variant="info"
          now={20}
          style={{ height: "120%", fontSize: "1rem" }}
        />
      </div>
    </Card>
  );
};

export default Progress;
