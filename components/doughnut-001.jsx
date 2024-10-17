import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Doughnut_01() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFantasy = await fetch('http://localhost/db-term-project/api/books/index.php?genre=Fantasy');
        const responseScience_Fiction = await fetch('http://localhost/db-term-project/api/books/index.php?genre=Science Fiction');

        const fantasyBooks = await responseFantasy.json();
        const Science_FictionBooks = await responseScience_Fiction.json();

        const fantasyCount = fantasyBooks.length;
        const Science_FictionCount = Science_FictionBooks.length;

        setData({
          labels: ['แฟนตาซี', 'ไซ-ไฟ'],
          datasets: [
            {
              label: '# ของหนังสือ',
              data: [fantasyCount, Science_FictionCount],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    };

    fetchData();
  }, []);

  return <Doughnut data={data} />;
}
