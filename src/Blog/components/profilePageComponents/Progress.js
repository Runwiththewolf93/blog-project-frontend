import React, { useMemo } from "react";
import { ProgressBar, Card } from "react-bootstrap";
import { capitalizeName } from "../../utils/helper";
import { shuffle } from "lodash";

/**
 * Renders a progress component with randomized labels and variants.
 *
 * @param {Object} userProfile - The user profile object.
 * @param {Object} userInfo - The user info object.
 * @returns {JSX.Element} The rendered progress component.
 */
// Progress component
const Progress = React.memo(({ userProfile, userInfo }) => {
  const getRandomNumber = () => Math.floor(Math.random() * 71) + 30;

  const labels = [
    "Security Audit",
    "Debugging Code",
    "Security Testing",
    "Product Infrastructure",
    "Network Security",
    "Database Administration",
    "Data Analysis",
    "Mobile App Development",
    "Machine Learning",
    "Cybersecurity Analyst",
  ];

  const variants = ["danger", "light", "warning", "success", "info"];

  // eslint-disable-next-line
  const shuffledLabels = useMemo(() => shuffle(labels).slice(0, 5), []);
  // eslint-disable-next-line
  const shuffledVariants = useMemo(() => shuffle(variants), []);

  return (
    <Card className="p-1">
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
});

export default Progress;
