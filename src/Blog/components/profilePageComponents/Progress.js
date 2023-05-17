import { ProgressBar, Card } from "react-bootstrap";
import { capitalizeName } from "../../utils/helper";
import { shuffle } from "lodash";

const Progress = ({ userProfile, userInfo }) => {
  const getRandomNumber = () => Math.floor(Math.random() * 81) + 20;

  const labels = [
    "Security Audit",
    "Debugging Code",
    "Security Testing",
    "Product Infrastructure",
    "Network Security",
  ];

  const variants = ["danger", "light", "warning", "success", "info"];

  const shuffledLabels = shuffle(labels);
  const shuffledVariants = shuffle(variants);

  return (
    <Card>
      <Card.Title>
        {capitalizeName(userInfo?.name) ||
          `${userProfile.name?.first} ${userProfile.name?.last}`}{" "}
        spends most of {userProfile.gender === "male" ? "his" : "her"} work time
        on:
      </Card.Title>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ gap: "0.5rem" }}
      >
        {shuffledLabels.map((label, index) => (
          <ProgressBar
            key={index}
            striped
            label={label}
            variant={shuffledVariants[index]}
            now={getRandomNumber()}
            style={{ height: "120%", fontSize: "1rem" }}
          />
        ))}
      </div>
    </Card>
  );
};

export default Progress;