import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateChartData } from "../../utils/helper";

/**
 * Generates a line chart component based on the given blog data.
 *
 * @param {Object[]} blogInfo - An array of blog information.
 * @param {string} blogInfo[].createdAt - The creation date of the blog.
 * @return {ReactElement} The line chart component.
 */
// LineChartComponent
const LineChartComponent = ({ blogInfo = [] }) => {
  const data = blogInfo.reduce((acc, blog) => {
    const date = new Date(blog.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const blogData = generateChartData(data, "date", "count");

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart
        data={blogData}
        margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
        data-testid="line-chart"
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
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
