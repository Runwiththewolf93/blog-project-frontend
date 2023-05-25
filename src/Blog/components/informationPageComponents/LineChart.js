import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { generateChartData } from "../../utils/helper";

const LineChartComponent = ({ blogInfo }) => {
  const data = blogInfo.reduce((acc, blog) => {
    const date = new Date(blog.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const blogData = generateChartData(data, "date", "count");

  return (
    <LineChart
      width={600}
      height={300}
      data={blogData}
      margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ dy: 5 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default LineChartComponent;
