import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { CourseContext } from '../../context.js';

class List extends Component {
	render() {
		return(
			<React.Fragment>
				<div className="dashboard-title">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Kursus</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/list" className="hover:underline hover:text-blue-400">kursus</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/list" className="hover:underline hover:text-blue-400">daftar</Link>
						</h4>
					</div>
				</div>
				<Link to="/admin/course/add" className="button-header transition duration-200 hover:bg-pink-600">Tambah Kursus</Link>
				<table className="table-lg">
					<thead className="bg-indigo-500 text-white">
						<tr>
							<th className="p-2">#</th>
							<th>Nama</th>
							<th>Instruktur</th>
							<th>Jumlah Siswa</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{
							this.context.courses.map((course , key) => {
								let iteration = key + 1;
								return(
									<tr key={key} className="text-center">
										<td className="p-2">{iteration}</td>
										<td className="text-left">{course.name}</td>
										<td className="text-left">{course.instructor}</td>
										<td>{course.students} orang</td>
										<td>
											<button onClick={() => this.context.removeCourse(course.id)} className="badge bg-red-400 focus:outline-none">hapus</button>
											<Link to={{
												pathname: '/admin/course/detail',
												state: course,
											}} className="badge bg-blue-400">detail</Link>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

List.contextType = CourseContext;
export default List;
	