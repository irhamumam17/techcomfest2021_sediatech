import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { EventContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class School extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Event Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/event/school" className="hover:underline hover:text-blue-400">event </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/event/school" className="hover:underline hover:text-blue-400">sekolah </Link> 
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
					<Link to="/school/event/add" className="button-header">Tambah Event Baru</Link>
				</motion.div>
				{
					(this.context.loading.schools) ?
						<Loading status={this.context.loading.schools} size="large" />
					:
						<div className="flex flex-row gap-4 my-4">
							{
								this.context.events.schools.map((event , key) => {
									return(
										<div key={key} className="w-1/3">
											<div className="bg-white rounded shadow-md overflow-hidden">
												<img src={process.env.REACT_APP_URL + `storage/event/images/${event.image}`} alt="theory thumbnail" className="w-full h-56  object-cover mb-3" />
												<div className="px-4 pb-4">
													<h2 className="font-semibold text-blue-500 text-2xl">{event.name}</h2>
													<h3 className="lowercase mb-2 -mt-1 text-purple-400">{event.location}</h3>
													<h3 className="lowercase mb-2 -mt-1 text-purple-400">{event.date}</h3>
													<div className="flex flex-row justify-between items-center mt-2 pt-2 border-t-2 border-gray-200">
														<Link to={"/school/event/detail/" + event.id} className="text-white py-1 px-4 bg-blue-400 rounded inline-block mt-2 uppercase font-semibold text-sm transition duration-200 hover:bg-blue-500">Detail</Link>
														<p className="text-sm text-gray-500">{event.status}</p>
													</div>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
				}
			</React.Fragment>
		);
	}
}

School.contextType = EventContext;
export default School;
