import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { LibraryContext } from '../../context.js';

class Loan extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="dashboard-title">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Buku Pinjaman</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/library/loan" className="hover:underline hover:text-blue-400">pinjaman </Link> 
						</h4>
					</div>
				</div>
				<Link to="/teacher/library/addborrow" className="button-header transition duration-200 hover:bg-pink-600">Tambah Pinjaman Buku</Link>
				{
					(this.context.loading.borrows) ?
						<Loading status={this.context.loading.borrows} size="large" />
					:
						<table className="table-lg">
							<thead className="bg-indigo-500 text-white"> 
								<tr>
									<th className="p-2">#</th>
									<th>Nama Siswa</th>
									<th>Judul Buku</th>
									<th>Tanggal Pinjam</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.getBorrow('borrow').map((activity , key) => {
										let iteration = key + 1;
										return (
											<tr key={key} >
												<td className="p-2 text-center">{iteration}</td>
												<td>{activity.student}</td>
												<td>{activity.title}</td>
												<td>{activity.date}</td>
												<td className=" text-center">
													<button onClick={ async (e) => {
														e.persist();
														let status = await this.context.markReturn(activity.id);
														if(status === 200) {
															let parent = e.target.parentElement.parentElement.parentElement;
															let child = e.target.parentElement.parentElement;
															parent.removeChild(child);
														}
													}} className="badge bg-blue">
														dikembalikan
													</button>
													<button  onClick={() => this.context.removeActivity(activity.id)} className="badge bg-red-400">hapus</button>
													<button className="badge bg-teal-400">edit</button>
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

Loan.contextType = LibraryContext;
export default Loan;
	