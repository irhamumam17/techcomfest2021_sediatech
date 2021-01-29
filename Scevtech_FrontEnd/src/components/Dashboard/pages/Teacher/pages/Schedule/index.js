import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';

class Schedule extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Jadwal Pelajaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/schedule" className="hover:underline hover:text-blue-400">jadwal </Link> 
						</h4>
					</div>
				</motion.div>
			</React.Fragment>
		);
	}
}

export default Schedule;
		