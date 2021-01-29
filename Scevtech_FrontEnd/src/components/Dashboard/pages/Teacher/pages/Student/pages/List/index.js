import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { StudentContext } from '../../context.js';

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Siswa</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/student/list" className="hover:underline hover:text-blue-400">siswa </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/student/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block">
					<Link to="/teacher/student/add" className="button-header">Tambah Siswa Baru</Link>
				</motion.div>
				{
					(this.context.get_students_loading) ?
						<Loading status={this.context.get_students_loading} size="large" />
					:
						<motion.table className="table-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .5}}
						>
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Nama</th>
									<th>Kelas</th>
									<th>NIS</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.students.map((student , key) => {
										return(
											<tr className="text-center" key={key}>
												<td className="p-2">{key + 1}</td>
												<td className="text-left">{student.name}</td>
												<td className="text-left">{student.class}</td>
												<td>{student.nis}</td>
												<td className="col-badge">
													<Tippy content="edit" delay={300} >
														<button className="badge-icon bg-teal">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
															  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
															</svg>
														</button>
													</Tippy>
													<Tippy content="detail" delay={300} >
														<button className="badge-icon bg-blue">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
															</svg>
														</button>
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

List.contextType = StudentContext;
export default List;
	