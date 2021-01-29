import React , {Component} from 'react';
import { Link } from 'react-router-dom';


class Statistic extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="dashboard-title">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Statistik Kursus</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/list" className="hover:underline hover:text-blue-400">kursus</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/statistic" className="hover:underline hover:text-blue-400">statistik</Link>
						</h4>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Statistic;
	