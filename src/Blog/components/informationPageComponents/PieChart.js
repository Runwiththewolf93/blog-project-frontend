import { PieChart, Pie, Tooltip, Legend } from "recharts";

/**
 * Generate a pie chart component based on the given vote information, user data, and screen size.
 *
 * @param {Array} voteInfo - An array of objects representing the vote information.
 * @param {Array} users - An array of objects representing the user data.
 * @param {boolean} isLaptopScreenOrSmaller - A boolean indicating whether the screen size is laptop or smaller.
 * @return {JSX.Element} The pie chart component.
 */
// PieChartComponent
const PieChartComponent = ({ voteInfo, users, isLaptopScreenOrSmaller }) => {
  const data = voteInfo.reduce((acc, vote) => {
    const user = vote.user;
    acc[user] = (acc[user] || 0) + 1;
    return acc;
  }, {});

  // Map the user IDs to user names
  const userData = users.reduce((acc, user) => {
    acc[user._id] = user.name;
    return acc;
  }, {});

  const voteData = Object.entries(data).map(([user, count]) => ({
    name: userData[user] || "Unknown",
    value: count,
  }));

  const size = Math.min(window.innerWidth, window.innerHeight) * 0.4;

  return (
    <div className="d-flex justify-content-center">
      <PieChart width={size} height={size}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={voteData}
          cx="50%"
          cy="50%"
          outerRadius={isLaptopScreenOrSmaller ? 65 : 85}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
