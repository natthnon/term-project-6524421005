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
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Books by Genre - Before and After 2000',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  },
};

const labels = ['Before 2000', 'After 2000'];

const colors = [
  'rgb(255, 99, 132)',
  'rgb(53, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
  'rgb(255, 20, 147)',
  'rgb(0, 255, 127)',
  'rgb(0, 0, 255)',
  'rgb(255, 140, 0)',
  'rgb(0, 128, 128)',
  'rgb(255, 105, 180)',
];

export function Line_multiaxis() {
  const [data, setData] = useState({
    labels,
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/db-term-project/api/books/index.php');
        const books = await response.json();

        const genreCounts = {
          'Fiction': [0, 0],
          'Adventure': [0, 0],
          'Science Fiction': [0, 0],
          'Fantasy': [0, 0],
          'Romance': [0, 0],
          'Dystopian': [0, 0],
          'Philosophical Fiction': [0, 0],
          'Psychological Fiction': [0, 0],
          'Gothic Fiction': [0, 0],
          'Coming-of-Age': [0, 0],
          'Post-Apocalyptic': [0, 0],
          'Historical Fiction': [0, 0],
        };

        books.forEach((book) => {
          if (genreCounts[book.genre]) {
            if (book.year_published < 2000) {
              genreCounts[book.genre][0]++;
            } else {
              genreCounts[book.genre][1]++;
            }
          }
        });

        const updatedData = {
          labels,
          datasets: Object.keys(genreCounts).map((genre, index) => ({
            label: genre,
            data: genreCounts[genre],
            borderColor: colors[index % colors.length],
            backgroundColor: `${colors[index % colors.length]}80`,
          })),
        };

        setData(updatedData);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, []);

  return <Line options={options} data={data} />;
}
