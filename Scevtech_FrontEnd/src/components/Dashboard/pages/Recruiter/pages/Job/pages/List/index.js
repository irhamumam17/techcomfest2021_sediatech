import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { JobContext } from '../../context.js';

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
							<Link to="/recruiter/dashboard" className="hover:underline hover:text-blue-400">rekruiter</Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/list" className="hover:underline hover:text-blue-400">job </Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/list" className="hover:underline hover:text-blue-400">daftar </Link> 
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
					<Link to="/recruiter/job/add" className="button-header">Tambah Job</Link>
				</motion.div>	
				<Loading status={this.context.loading.del} size="small" />
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
							<thead className="bg-indigo-400 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Posisi</th>
									<th colSpan="2" >Keterangan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.jobs.map((job , key) => {
										return(
											<tr key={key} className="text-center"> 
												<td>{key + 1}</td>
												<td className="text-left p-2">{job.position}</td>
												<td>{job.ket.time}</td>
												<td>{job.ket.distance}</td>
												<td>
													<button onClick={() => this.context.removeJob(job.id)} className="badge bg-red">hapus</button>
													<Link to="/recruiter/job/detail/1" className="badge bg-blue">detail</Link>
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
	