import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { JobContext } from '../../context.js';

class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		}
	}

	componentDidMount = async () => {
		let id = this.props.match.params.id;
		let job = await this.context.detailJob(id);
		console.log(job);
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Detail Job</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/recruiter/dashboard" className="hover:underline hover:text-blue-400">rekruiter</Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/list" className="hover:underline hover:text-blue-400">job </Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/list" className="hover:underline hover:text-blue-400">detail </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div  
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					>
					<Link to="/recruiter/job/list" className="button-header">Daftar Job</Link>
				</motion.div>	
			</React.Fragment>

		);
	}
}


Detail.contextType = JobContext;
export default Detail;
	