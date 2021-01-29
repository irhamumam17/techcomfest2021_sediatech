import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';

class Feedback extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Feedback</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/feedback" className="hover:underline hover:text-blue-400">Feedback </Link> 
						</h4>
					</div>
				</motion.div>
			</React.Fragment>
		);
	}
}

export default Feedback;
	