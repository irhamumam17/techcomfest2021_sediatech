import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class Statistic extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Statistik Pembayaran</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">pembayaran </Link>
						<span className="mx-1">/</span>
						<Link to="/teacher/payment/statistic" className="hover:underline hover:text-blue-400">statistik </Link> 
					</h4>
				</div>
			</React.Fragment>
		);
	}
}

export default Statistic;
	