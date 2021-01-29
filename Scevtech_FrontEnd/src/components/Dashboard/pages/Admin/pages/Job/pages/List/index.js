import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { JobContext } from '../../context.js';
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Job</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/job/list" className="hover:underline hover:text-blue-400">job </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/job/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				{
					(this.context.loading.jobs) ?
						<Loading status={this.context.loading.jobs} size="large" />
					: 
						<motion.table className="table-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .2}}
						>
							<thead className="bg-blue-400 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Posisi</th>
									<th colSpan='2' >Keterangan</th>
									<th>Status</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
							{
								this.context.jobs.map((job , key) => {
									return (
										<tr key={key} >
											<td className="p-2 text-center">{key + 1}</td>
											<td>{ job.position }</td>
											<td>{ job.ket.time }</td>
											<td>{ job.ket.distance }</td>
											<td>{ job.status }</td>
											<td className="col-badge">
												<Tippy content="Tolak" delay={300} >
													<button onClick={() => this.context.updateStatus(job.id , 'reject')} className="badge-icon bg-red">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
														</svg>
													</button>
												</Tippy>
												<Tippy content="Konfirmasi" delay={300} >
													<button onClick={() => this.context.updateStatus(job.id , 'confirmed')} className="badge-icon bg-teal">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
														</svg>
													</button>
												</Tippy>
												<Tippy content="Detail" delay={300} >
													<Link to={`/admin/job/detail/${job.id}`} className="badge-icon bg-blue">
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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

List.contextType = JobContext;
export default List;
	