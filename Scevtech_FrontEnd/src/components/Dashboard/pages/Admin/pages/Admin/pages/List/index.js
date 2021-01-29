import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AdminContext } from '../../context.js';
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Admin</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/admin/list" className="hover:underline hover:text-blue-400">Daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
							variants={Variants}
							initial="btnHeadInit"
							animate="btnHeadAnimate"
							transition="btnHeadTransition"
							className="inline-block">
					<Link to="/admin/admin/add" className="button-header" >Tambah Admin Baru</Link>
				</motion.div>
				<Loading status={this.context.deleteLoading} size="small" />
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
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{this.context.admins.map((admin , key) => {
							let iteration = key + 1;
							return (
								<tr key={key}>
									<td className="p-2 text-center">{iteration}</td>
									<td>{admin.name}</td>
									<td className="col-badge">
										<Tippy content="Pesan" delay={300}>
											<a href="/admin/admin/detail" className="bg-teal badge-icon">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
												</svg>
											</a>
										</Tippy>
										<Tippy content="Hapus"  delay={300} >
											<button onClick={() => this.context.removeAdmin(admin.id)} className="badge-icon bg-red">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
												</svg>
											</button>
										</Tippy>
										<Tippy content="Detail"  delay={300}>
											<a href="/admin/admin/detail" className="badge-icon bg-blue">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
												  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
												</svg>
											</a>
										</Tippy>
									</td>
								</tr>
							)
						})}
					</tbody>
				</motion.table>
				<Loading status={this.context.getLoading} size="large" />
			</React.Fragment>
		);
	}
}

List.contextType = AdminContext;
export default List;
	