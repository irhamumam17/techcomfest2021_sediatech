import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { DutyContext } from '../../context.js';

class All extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Semua Tugas</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/duty/all" className="hover:underline hover:text-blue-400">tugas </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/duty/all" className="hover:underline hover:text-blue-400">semua </Link> 
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
					<Link to="/student/duty/new" className="button-header" >Tugas Terbaru</Link>
				</motion.div>
				<div className="my-4 flex flex-row gap-4">
					{
						this.context.duties.map((duty , key) => {
							return (
								<div className="w-1/3" key={key}>
									<motion.div className="bg-white rounded shadow-md overflow-hidden"
										variants={Variants}
										initial="cardInit"
										animate="cardAnimate"
										transition={{...Variants.cardTransition , delay: .3 + (key * 2/10)}}
										>
										<img src={process.env.REACT_APP_URL + 'storage/duty/covers/' + duty.thumbnail} alt="duty thumbnail" className="w-full h-56  object-cover mb-3" />
										<div className="px-4 pb-4">
											<h2 className="font-semibold text-blue-500 text-2xl">{duty.title}</h2>
											<h3 className="lowercase mb-2 -mt-1 text-purple-400">{duty.subject}</h3>
											<p className="text-sm text-gray-600">{duty.description}</p>
											<div className="flex flex-row justify-between items-center mt-2 pt-2 border-t-2 border-gray-200">
												<Link to={"/student/duty/detail/" + duty.id} className="text-white py-1 px-4 bg-blue-400 rounded inline-block mt-2 uppercase font-semibold texts-sm transition duration-200 hover:bg-blue-500">Detail</Link>
												<p className="text-sm text-gray-500">{duty.created_at}</p>
											</div>
										</div>
									</motion.div>
								</div>
							)
						})
					}
				</div>
			</React.Fragment>
		);
	}
}

All.contextType = DutyContext;
export default All;
	