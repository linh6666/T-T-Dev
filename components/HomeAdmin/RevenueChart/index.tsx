"use client";

import { BarChart } from '@mantine/charts';

const revenueData = [
  { month: 'Tháng 1', revenue: 120000000 },
  { month: 'Tháng 2', revenue: 95000000 },
  { month: 'Tháng 3', revenue: 134000000 },
  { month: 'Tháng 4', revenue: 110000000 },
  { month: 'Tháng 5', revenue: 145000000 },
  { month: 'Tháng 6', revenue: 175000000 },
  { month: 'Tháng 7', revenue: 162000000 },
  { month: 'Tháng 8', revenue: 193000000 },
  { month: 'Tháng 9', revenue: 208000000 },
  { month: 'Tháng 10', revenue: 223000000 },
  { month: 'Tháng 11', revenue: 240000000 },
  { month: 'Tháng 12', revenue: 260000000 },
];

export default function RevenueChart() {
  return (
    <div>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        📊 Doanh thu theo tháng (VNĐ)
      </h2>
      <BarChart
        h={300}
        data={revenueData}
        dataKey="month"
        withLegend={false}
        series={[{ name: 'revenue', color: 'blue.6', label: 'Doanh thu' }]}
        valueFormatter={(value) => value.toLocaleString('vi-VN')}
      />
    </div>
  );
}
