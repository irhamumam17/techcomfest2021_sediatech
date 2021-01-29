import React , { useEffect } from 'react';
import Chart from 'chart.js';

function UIChart({ id , title , labels , data }) {
	useEffect(() => {
		const ctx = document.getElementById(id).getContext('2d');
		let gradient = ctx.createLinearGradient(0,50,0,300);
			gradient.addColorStop(0.3,'#7890fb78');
			gradient.addColorStop(1, 'rgba(255,255,255,0)');
		new Chart(ctx , {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: title,
							data: data,
							backgroundColor: gradient,
							borderWidth: 3,
							borderColor: '#c0cbfd',
							pointRadius: 0,
						}
					]
				},
				options: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: title,
					},
					responsive: true,
					scales: {
						yAxes: [{
							ticks: {
								stepSize: 10,
							}
						}]
					},
				}
			});
	})

	return(
		<canvas id={id} ></canvas>
	)
}

export default UIChart;