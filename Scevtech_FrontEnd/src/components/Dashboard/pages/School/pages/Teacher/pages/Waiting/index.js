import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { TeacherContext } from '../../context.js';

class Waiting extends Component {
	static contextType = TeacherContext;

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Guru Menunggu</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/list" className="hover:underline hover:text-blue-400">guru </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/waiting" className="hover:underline hover:text-blue-400">menunggu </Link> 
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
					<Link to="/school/teacher/add" className="button-header">Tambah Guru Baru</Link>
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
							<th>Peran</th>
							<th>NIP</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr className="text-center" key="1">
							<td className="p-2">1</td>
							<td className="text-left">Findan</td>
							<td className="text-left">Mata Pelajaran</td>
							<td>-</td>
							<td>
								<button onClick={() => this.context.removeTeacher(1)} className="badge bg-red-400 focus:outline-none">hapus</button>
								<button className="badge bg-blue-400">detail</button>
							</td>
						</tr>
					</tbody>
				</motion.table>
			</React.Fragment>
		);
	}
}

export default Waiting;
	