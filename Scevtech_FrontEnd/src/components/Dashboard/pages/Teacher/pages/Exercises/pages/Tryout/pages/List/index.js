import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../../../../../components/Variants/';
import { TryoutContext } from '../../context.js';
import Loading from '../../../../../../../../components/Loading/';

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Latihan Soal</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/exercises/tryout/list" className="hover:underline hover:text-blue-400">latihan soal </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/exercises/tryout/list" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/teacher/exercises/tryout/add" className="button-header">Tambah Latihan Soal</Link>
				</motion.div>
				<Loading status={this.context.loading.destroy} size="small" />
				{
					(this.context.loading.tryouts) ?
						<Loading status={this.context.loading.tryouts} size="large" />
					:
						<motion.table className="table-lg"
								variants={Variants}
								initial="cardInit"
								animate="cardAnimate"
								transition={{...Variants.cardTransition , delay: .4}}
							>
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Judul</th>
									<th>Durasi</th>
									<th>Batas Akhir</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.tryouts.map((tryout , key) => {
										return(
											<tr key={key}>
												<td className="p-2 text-center">{key + 1}</td>
												<td>{tryout.title}</td>
												<td>{tryout.duration} menit</td>
												<td>{tryout.deadline}</td>
												<td className="col-badge">
													<Tippy content="hapus" delay={300}>
														<button onClick={() => this.context.removeTryout(tryout.id)} className="badge-icon bg-red">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
															  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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


List.contextType = TryoutContext;
export default List;
	