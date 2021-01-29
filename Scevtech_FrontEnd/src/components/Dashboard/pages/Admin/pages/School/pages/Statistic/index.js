import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Chart from 'chart.js';


class Statistic extends Component {
	componentDidMount() {
		const ctx = document.getElementById('chart').getContext('2d');
		let gradient = ctx.createLinearGradient(0,50,0,500)
		gradient.addColorStop(0.3,'#7890fb78');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		new Chart(ctx , {
			type: 'line',
			data: {
				labels: ['Jan' , 'Feb' , 'March' , 'April' , 'Mei' , 'Juni'],
				datasets: [
					{
						label: 'Grafik Sekolah Mitra',
						data: [86,67,91 , 85,74,65],
						backgroundColor: gradient,
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					yAxes: [{
						ticks: {
							stepSize: 10,
						}
					}]
				}
			}
		});
	}

	render() {
		return(
			<React.Fragment>
				<motion.div className="dashboard-title"
								variants={ Variants }
								initial="tInit"
								animate="tAnimate"
								transition="tTransition"
						>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/school" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">sekolah </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/statistic" className="hover:underline hover:text-blue-400">statistik </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div 
								variants={Variants}
								initial="btnHeadInit"
								animate="btnHeadAnimate"
								transition="btnHeadTransition"
								className="inline-block"
						>
					<Link to="/admin/school/list" className="button-header" >Lihat Daftar Sekolah</Link>
				</motion.div>
				<div className="bg-white rounded shadow-lg py-6 my-4">
					<canvas id="chart" className="w-full"></canvas>
				</div>
			</React.Fragment>
		);
	}
}

export default Statistic;
	