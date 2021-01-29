import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { LibraryContext } from '../../context.js';
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Perpustakaan</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/student/dashboard" className="hover:underline hover:text-blue-400">siswa</Link> 
							<span className="mx-1">/</span>
							<Link to="/student/library" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						</h4>
					</div>
				</motion.div>
					{
						(this.context.loading.borrows) ?
							<Loading status={this.context.loading.borrows} size="large" />
						:
							<table className="table-lg">
								<thead className="bg-indigo-400 text-white">
									<tr>
										<th className="p-2">#</th>
										<th>Buku</th>
										<th>Tanggal Pinjam</th>
										<th>Tanggal Pengembalian</th>
										<th>Aksi</th>
									</tr>
								</thead>
								<tbody>
									{
										this.context.borrows.map((data , key) => {
											return(
												<tr key={key}>
													<td className="p-2 text-center">{key + 1}</td>
													<td>{data.book}</td>
													<td>{data.borrow_at}</td>
													<td>{data.return_at}</td>
													<td className="text-center">
														<Link to={`/student/library/${data.id}`} className="badge bg-blue">detail</Link>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
					}
			</React.Fragment>
		);
	}
}


List.contextType = LibraryContext;
export default List;
	