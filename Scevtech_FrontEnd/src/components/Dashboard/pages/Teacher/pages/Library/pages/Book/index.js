import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { LibraryContext } from '../../context.js';

class Book extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Buku Perpustakaan</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">perpustakaan </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/library/book" className="hover:underline hover:text-blue-400">buku </Link> 
					</h4>
				</div>
				<Link to="/teacher/library/addbook" className="button-header transition duration-200 hover:bg-pink-600">Tambah Buku</Link>
				<Loading status={this.context.loading.delBooks} size="small" />
				{
					(this.context.loading.books) ?
						<Loading status={this.context.loading.books} size="large" />
					:
						<table className="table-lg">
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Judul Buku</th>
									<th>Jumlah Buku</th>
									<th>Penulis</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{
									this.context.books.map((book , key) => {
										let iteration = key + 1;
										return (
											<tr key={key} >
												<td className="p-2 text-center"> {iteration} </td>
												<td> {book.title} </td>
												<td> {book.total} </td>
												<td> {book.publisher} </td>
												<td className="text-center">
													<button onClick={() => this.context.removeBook(book.id)} className="badge bg-red-400">hapus</button>
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

Book.contextType = LibraryContext;
export default Book;
	