import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { SubjectContext } from '../../context.js';

class Schedules extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Jadwal Pelajaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/subject/list" className="hover:underline hover:text-blue-400">mata pelajaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/subject/schedule" className="hover:underline hover:text-blue-400">jadwal pelajaran </Link> 
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
					<Link to="/student/subject/list" className="button-header">Lihat Daftar Pelajaran</Link>
				</motion.div>
				{
					(this.context.loading.schedules) ?
						<Loading status={this.context.loading.schedules} size="large" />
					:
						<div className="my-6 flex flex-row gap-2 w-full">
						{
							this.context.schedules.map((day , key) => {
								return(
										<div key={key} className="w-1/3">
											<motion.div className="bg-white rounded shadow-md"
													variants={Variants}
													initial="cardInit"
													animate="cardAnimate"
													transition={{...Variants.cardTransition , delay: .2 + (key * 2/10)}}
												>
												<h2 className="font-semibold text-lg text-blue-500 p-2 px-4">
													<svg className="absolute h-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
													  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
													</svg>
													<span className="inline-block ml-8">
														{day.day}
													</span>
												</h2>
												<ul>
												{
													day.subjects.map((subject , key) => {
														let style = (key % 2 === 0) ? `bg-gray-100` : '';
														return(
															<li className={style + ` relative w-full p-2 px-4 relative text-sm text-gray-700`} key={key}>
																<svg className="absolute h-4 mt-1 ml-1 text-gray-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
																</svg>
																<span className="inline-block ml-8">
																	{subject.subject}
																</span>
															</li>
														)
													})
												}
												</ul>
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


Schedules.contextType = SubjectContext;
export default Schedules;
	