import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';

class Version extends Component {
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Versi Aplikasi</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/setting/theme" className="hover:underline hover:text-blue-400">pengaturan </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/setting/version" className="hover:underline hover:text-blue-400">version </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
					<motion.div className="w-2/3"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}
					>
						<table className="table-lg">
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Versi</th>
									<th>Tgl Update</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="p-2 text-center">1</td>
									<td>v1.12</td>
									<td>21 November 2020</td>
									<td className="text-center">
										<button className="badge bg-red-400 focus:outline-none">hapus</button>
										<button className="badge bg-teal-400 focus:outline-none">edit</button>
									</td>
								</tr>
							</tbody>
						</table>
					</motion.div>
					<motion.div className="w-1/3"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .4}}
					>
						<form className="card">
							<div className="my-4">
								<label className="form-label">Versi</label>
								<input type="text" placeholder="Nama" name="name" className="form-input focus:shadow-outline focus:outline-none "/>
							</div>
							<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
						</form>
					</motion.div>
				</div>
			</React.Fragment>
		);
	}
}

export default Version;
	