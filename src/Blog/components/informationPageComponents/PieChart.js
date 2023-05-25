import { PieChart, Pie, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ voteInfo, users }) => {
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

  return (
    <div className="d-flex justify-content-center">
      <PieChart width={600} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={voteData}
          cx="50%"
          cy="50%"
          outerRadius={100}
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
