import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { AbsentContext } from '../../context.js';

class Mine extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Absensi</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/absent/list" className="hover:underline hover:text-blue-400">absensi </Link> 
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
					{
						(!this.context.get_status) ?
								(!this.context.status) ?
									<button onClick={() => this.context.absentNow()} className="button-header transition duration-200 hover:bg-pink-600">Absen Sekarang</button>
								:
									<div className="button bg-green-400 w-40 transition duration-200 hover:bg-green-500">Sudah Absen</div>
							:''
					}
				</motion.div>
				{
					(this.context.get_schedules) ?
						<React.Fragment>
							<div className="my-8"></div>
							<Loading status={this.context.get_schedules} size="large" />
						</React.Fragment>
					:
						<div className="flex flex-row flex-wrap gap-3">
							{
								this.context.schedules.map((absent , key) => {
									return  (
										<div key={key} className="w-32">
											<motion.div className="card text-center"
													variants={Variants}
													initial="cardInit"
													animate="cardAnimate"
													transition={{...Variants.cardTransition , delay: .1 + (key * 1/10)}}
												>
												<h1 className="text-6xl font-bold text-blue-500 -my-2 -mt-4">{absent.day}</h1>
												<h2>{absent.month}</h2>
												<h2>{absent.year}</h2>
												{
													(absent.status === 'already') ?
														<p className="flex flex-row justify-center items-center text-green-400 mt-3">
															<svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
															</svg>
															<span className="text-sm lowercase font-semibold ml-1">Absen</span>
														</p>
														:
														<p className="flex flex-row justify-center items-center text-red-400 mt-3">
															<svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
														</svg>
															<span className="text-xs lowercase font-semibold ml-1">Tidak absen</span>
														</p>
												}
											</motion.div>
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

Mine.contextType = AbsentContext;
export default Mine;
		