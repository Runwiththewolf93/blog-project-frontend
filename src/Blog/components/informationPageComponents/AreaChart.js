import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ blogInfo }) => {
  const voteData = blogInfo.map(blog => ({
    title: blog.title,
    votes: blog.totalVotes,
  }));

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart
        data={voteData}
        margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="votes" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
