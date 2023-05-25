import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AreaChartComponent = ({ blogInfo }) => {
  const voteData = blogInfo.map(blog => ({
    title: blog.title,
    votes: blog.totalVotes,
  }));

  return (
    <AreaChart
      width={600}
      height={300}
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
  );
};

export default AreaChartComponent;
