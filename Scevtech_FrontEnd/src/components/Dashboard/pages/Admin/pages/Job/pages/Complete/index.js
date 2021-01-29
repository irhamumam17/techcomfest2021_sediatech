import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';

class Complete extends Component {
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
						<h2 className="text-xl font-bold">Job Selesai</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/job/list" className="hover:underline hover:text-blue-400">job</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/job/complete" className="hover:underline hover:text-blue-400">selesai </Link> 
						</h4>
					</div>
				</motion.div>
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
							<th>Perusahaan</th>
							<th>Batas Waktu</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2 text-center">1</td>
							<td>FrontEnd Developer</td>
							<td>Dicoding Indonesia</td>
							<td>15 Desember 2020</td>
							<td className="text-center">
								<button className="badge bg-red-400 focus:outline-none">hapus</button>
								<Link to="/admin/job/detail" className="badge bg-blue-400">detail</Link>
							</td>
						</tr>
					</tbody>
				</motion.table>
			</React.Fragment>
		);
	}
}

export default Complete;
	