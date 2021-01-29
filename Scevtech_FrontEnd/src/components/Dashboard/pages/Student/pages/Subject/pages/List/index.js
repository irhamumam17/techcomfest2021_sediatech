import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { SubjectContext } from '../../context.js';
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Mapel</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/subject/list" className="hover:underline hover:text-blue-400">mata pelajaran </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/subject/list" className="hover:underline hover:text-blue-400">daftar </Link> 
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
					<Link to="/student/subject/schedule" className="button-header">Lihat Jadwal Pelajaran</Link>
				</motion.div>
				{
					(this.context.loading.subjects) ?
						<Loading status={this.context.loading.subjects} size="large" />
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
									<th>Mata Pelajaran</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.subjects.map((subject, key) => {
										return(
											<tr key={key}>
												<td className="p-2 text-center">{key + 1}</td>
												<td>{subject.subject}</td>
												<td className="col-badge">
													<Tippy content="materi" delay={300}>
														<Link to="/student/theory/list" className="badge-icon bg-indigo">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
															</svg>
														</Link>
													</Tippy>
													<Tippy content="tugas" delay={300}>
														<Link to="/student/duty/list" className="badge-icon bg-teal">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
															  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
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


List.contextType = SubjectContext;
export default List;
	