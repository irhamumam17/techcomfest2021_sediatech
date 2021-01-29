import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ScheduleContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class List extends Component {
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
						<h2 className="text-xl font-bold">Jadwal Pelajaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/d ashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/schedule/list" className="hover:underline hover:text-blue-400">jadwal pelajaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/schedule/list" className="hover:underline hover:text-blue-400">daftar</Link> 
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
					<Link to="/school/schedule/add" className="button-header">Buat Jadwal Pelajaran</Link>
				</motion.div>
				{
					(this.context.loading.schedules) ?
						<Loading status={this.context.loading.schedules} size="large" />
					:
						<React.Fragment>
							{
								this.context.schedules.map((data , key) => {
									let value = data.value;
									let delay = .2 + (key*4/10);
									return(
										<div key={key} className="my-6">
											<motion.div
												variants={Variants}
												initial="cardInit"
												animate="cardAnimate"
												transition={{...Variants.cardTransition , delay: delay}}
											>
												<div className="bg-white px-4 py-2 rounded shadow-md mb-4 mt-2 inline-block border-l-2 border-blue-400 text-blue-400">
													<svg className="h-6 inline-block absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
													  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
													</svg>
													<span className="font-semibold text-lg inline-block ml-8">
													{value[0].class_name}
													</span>
												</div>
											</motion.div>
											<div className="flex flex-row gap-2 w-full">
												{
													value.map((day , key) => {
														let dayDelay = delay+ .2 + (key*2/10);
														return(
																<div key={key} className="w-1/3">
																	<motion.div className="bg-white rounded shadow-md"
																		variants={Variants}
																		initial="cardInit"
																		animate="cardAnimate"
																		transition={{...Variants.cardTransition , delay: dayDelay}}
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
										</div>
									)
								})
							}

						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

List.contextType = ScheduleContext;
export default List;
	