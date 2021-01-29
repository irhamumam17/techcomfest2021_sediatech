import React , {Component} from 'react';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="dashboard-title">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Dashboard</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/recruiter/dashboard" className="hover:underline hover:text-blue-400">rekruiter</Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/dashboard" className="hover:underline hover:text-blue-400">dashboard </Link> 
						</h4>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;
	