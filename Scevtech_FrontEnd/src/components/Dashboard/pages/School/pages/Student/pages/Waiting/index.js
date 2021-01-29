import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { StudentContext } from '../../context.js';

class Waiting extends Component {
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
						<h2 className="text-xl font-bold">Siswa Menunggu</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/student/list" className="hover:underline hover:text-blue-400">siswa </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/student/waiting" className="hover:underline hover:text-blue-400">menunggu </Link> 
						</h4> 
					</div>
				</motion.div>
				<motion.div 
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block">
					<Link to="/school/student/add" className="button-header">Tambah Siswa Baru</Link>
				</motion.div>
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
						<tr className="text-center" key="1">
							<td className="p-2">1</td>
							<td className="text-left">Abdul latif</td>
							<td className="text-left">12 MM B</td>
							<td>3021</td>
							<td>
								<button onClick={() => this.context.removeStudent(1)} className="badge bg-red-400 focus:outline-none">hapus</button>
								<button className="badge bg-blue-400">detail</button>
							</td>
						</tr>
					</tbody>
				</motion.table>
			</React.Fragment>
		);
	}
}

Waiting.contextType = StudentContext;
export default Waiting;
	