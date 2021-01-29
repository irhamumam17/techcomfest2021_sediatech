import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { LibraryContext } from '../../context.js';

class Return extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Pengembalian Buku</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/return" className="hover:underline hover:text-blue-400">pengembalian </Link> 
					</h4>
				</div>
				<Link to="/teacher/library/book" className="button-header transition duration-200 hover:bg-pink-600">Lihat Daftar Buku</Link>
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
									this.context.getBorrow('return').map((activity , key) => {
										let iteration = key + 1;
										return (
											<tr key={key} >
												<td className="p-2 text-center">{iteration}</td>
												<td>{activity.student}</td>
												<td>{activity.title}</td>
												<td>{activity.date}</td>
												<td className=" text-center">
													<button onClick={() => this.context.removeBorrow(activity.id)} className="badge bg-red-400">hapus</button>
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

Return.contextType = LibraryContext;
export default Return;
	