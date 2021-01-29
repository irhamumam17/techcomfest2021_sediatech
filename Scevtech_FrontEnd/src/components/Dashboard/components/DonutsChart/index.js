import React , { useEffect } from 'react';
import Chart from 'chart.js';

function DonutsChart({ id , title , labels , data }) {
	useEffect(() => {
		const ctx = document.getElementById(id).getContext('2d');
		new Chart(ctx , {
				type: 'doughnut',
				data: {
					labels: labels,
					datasets: [
						{
							label: title,
							data: data,
							backgroundColor: ['#b794f4' , '#d1a0f138'],
						}
					]
				},
				options: {
					responsive: true,
					legend: {
						display: false,
					}
				}
			});
	})

	return (
			<canvas id={id} className="w-full" ></canvas>
		)
}

export default DonutsChart;