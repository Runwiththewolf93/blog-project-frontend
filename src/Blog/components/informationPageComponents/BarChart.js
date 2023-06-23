import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateChartData } from "../../utils/helper";

const BarChartComponent = ({ commentInfo }) => {
  const data = commentInfo.reduce((acc, comment) => {
    const user = comment.user.name;
    acc[user] = (acc[user] || 0) + 1;
    return acc;
  }, {});

  const commentData = generateChartData(data, "user", "count");

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart
        data={commentData}
        margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user" tick={{ dy: 5 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
