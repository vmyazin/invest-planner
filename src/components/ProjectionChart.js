// src/components/ProjectionChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectionChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow mt-6">
    <h2 className="text-xl font-semibold mb-4 text-secondary">10-Year Projection</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#f6821e" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ProjectionChart;
