import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../../../../../components/Variants/';
import Loading from '../../../../../../../../components/Loading/';
import { ExamContext } from '../../context.js';

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Ujian</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/exercises/exam/list" className="hover:underline hover:text-blue-400">ujian</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/exercises/exam/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.context.loading.exams) ?
						<Loading status={this.context.loading.exams} size="large" />
					:
						<motion.table className="table-lg"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .4}}
							>
							<thead className="bg-blue-400 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Judul</th>
									<th>Mulai</th>
									<th>Dibuat</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.exams.map((exam , key) => {
										return (
											<tr key={key}>
												<td className="p-2 text-center">{ key + 1 }</td>
												<td>{ exam.title }</td>
												<td>{ exam.start_time }</td>
												<td>{ exam.created_at }</td>
												<td className="text-center">
													<Tippy content="kerjakan" delay={300}>
														<Link to={`/student/exercises/exam/do/${exam.id}`} className="badge-icon bg-blue">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
															  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
															</svg>
														</Link>
													</Tippy>
												</td>
											</tr>
										)
									})
								}
							</tbody>
						</motion.table>
				}
			</React.Fragment>
		);
	}
}

List.contextType = ExamContext;
export default List;
	