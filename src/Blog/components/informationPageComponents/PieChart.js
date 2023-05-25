import { PieChart, Pie, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ voteInfo, users }) => {
  const data = voteInfo.reduce((acc, vote) => {
    const user = vote.user;
    acc[user] = (acc[user] || 0) + vote.vote;
    return acc;
  }, {});

  const userData = users.reduce((acc, user) => {
    acc[user._id] = user.name;
    return acc;
  }, {});

  const voteData = Object.entries(data).map(([user, count]) => ({
    name: userData[user] || "Unknown",
    value: count,
  }));

  console.log(voteData);

  return (
    <div className="d-flex justify-content-center mt-3">
      <PieChart width={400} height={400}>
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
        <Legend wrapperStyle={{ paddingBottom: "80px" }} />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;

// Get explanation for the code above step by step
