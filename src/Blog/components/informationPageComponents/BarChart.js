import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ commentInfo }) => {
  const data = commentInfo.reduce((acc, comment) => {
    const user = comment.user.name;
    acc[user] = (acc[user] || 0) + 1;
    return acc;
  }, {});

  const commentData = Object.entries(data).map(([user, count]) => ({
    user,
    count,
  }));

  return (
    <BarChart
      width={600}
      height={300}
      data={commentData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="user" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
