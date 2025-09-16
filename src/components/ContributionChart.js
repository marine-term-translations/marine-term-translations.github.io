import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ContributionChart = ({ data = [], title = "Contribution Overview" }) => {
  const formatTooltip = (value, name, props) => {
    if (name === 'totalEdits') {
      return [`${value} edits`, 'Total Edits'];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    return tickItem.length > 10 ? `${tickItem.substring(0, 10)}...` : tickItem;
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header 
        className="text-white border-0"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <h5 className="mb-0 d-flex align-items-center">
          📊 {title}
        </h5>
      </Card.Header>
      <Card.Body>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis 
                dataKey="userId" 
                tickFormatter={formatXAxisLabel}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                fontSize={12}
                stroke="#6c757d"
              />
              <YAxis 
                stroke="#6c757d"
                fontSize={12}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelStyle={{ color: '#495057' }}
                contentStyle={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="totalEdits" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
                stroke="#667eea"
                strokeWidth={1}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#764ba2" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted py-5">
            <div className="display-1 mb-3">📊</div>
            <h5>No Data Available</h5>
            <p>Chart will appear when data is loaded</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContributionChart;