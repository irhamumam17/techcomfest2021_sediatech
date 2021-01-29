import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {SchoolContext} from '../../context.js'; 
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/school" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">sekolah </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">daftar </Link> 
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
					<Link to="/admin/school/add" className="button-header" >Tambah Sekolah</Link>
				</motion.div>
				<Loading status={this.context.deleteSchoolLoading} size="small" />
				<motion.table className="bg-white w-full shadow-lg rounded overflow-hidden my-4"
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .2}}
				>
					<thead className="bg-indigo-500 text-white">
						<tr>
							<th className="p-2">#</th>
							<th>Nama</th>
							<th>Guru</th>
							<th>Siswa</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{
							this.context.schools.map((school , key) => {
								let iteration = key + 1;
								let status;
								if(school.status === 'active') {
									status = <span className="text-teal-400">aktif</span>
									
								} else {
									status = <span className="text-red-400">tidak aktif</span>	
								}
								return (
									<tr key={iteration}  className="text-center">
										<td className="p-2">{iteration}</td>
										<td className="text-left">{school.name}</td>
										<td>10</td>
										<td>100</td>
										<td>{status}</td>
										<td className="col-badge">
											<Tippy content="Hapus"  delay={300}>
												<button onClick={() => this.context.removeSchool(school.id)} className="badge-icon bg-red">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
													  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
													</svg>
												</button>
											</Tippy>
											<Tippy content="Detail"  delay={300}>
												<Link to={{
													pathname: '/admin/school/detail',
													state: school,
												}} className="badge-icon bg-blue">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
													  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
													</svg>
												</Link>
											</Tippy>
										</td>
									</tr>
								);
							})
						}
					</tbody>
				</motion.table>
				<Loading status={this.context.getSchoolLoading} size="large" />
			</React.Fragment>
		);
	}
}

List.contextType = SchoolContext;
export default List;
		