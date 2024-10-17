import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'จำนวนหนังสือตามปี',
    },
  },
};

export async function getData() {
  const res = await fetch('http://localhost/db-term-project/api/books/index.php');
  if (!res.ok) {
    throw new Error("ไม่สามารถดึงข้อมูลได้");
  }
  return res.json();
}

export function Bar_022() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        
        if (data.length === 0) {
          console.error("ไม่มีข้อมูลสำหรับกราฟ");
          return;
        }

        
        const counts = { 'อายุเกิน 100 ปี': 0, 'อายุไม่เกิน 100 ปี': 0 };
        data.forEach(book => {
          if (book.year_published <= 1924) {
            counts['อายุเกิน 100 ปี'] += 1; 
          } else {
            counts['อายุไม่เกิน 100 ปี'] += 1;
          }
        });

        const genres = Object.keys(counts);
        const dataset = [{
          label: 'จำนวนหนังสือ',
          data: genres.map(genre => counts[genre]),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }];

        setChartData({
          labels: genres,
          datasets: dataset,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (chartData.labels.length === 0) {
    return <p>กำลังโหลดข้อมูลหรือไม่มีข้อมูล</p>;
  }

  return <Bar options={options} data={chartData} />;
}
