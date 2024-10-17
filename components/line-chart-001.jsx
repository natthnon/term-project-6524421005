"use client";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Books by Genre',
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

export function LineChart001() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Books',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await getData();
        console.log(jsonData);

        
        const genreCounts = jsonData.reduce((acc, book) => {
          acc[book.genre] = (acc[book.genre] || 0) + 1;  
          return acc;
        }, {});

        setData({
          labels: Object.keys(genreCounts),  
          datasets: [
            {
              label: 'Number of Books',
              data: Object.values(genreCounts),  
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ]
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return <Line options={options} data={data} />;
}
