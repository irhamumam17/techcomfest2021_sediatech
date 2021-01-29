import React from 'react';
import { Link } from 'react-router-dom';

function List({responses , duty}) {
	return(
		<React.Fragment>
			<table className="table-lg">
				<thead className="bg-indigo-400 text-white">
					<tr>
						<th className="p-2">#</th>
						<th>Siswa</th>
						<th>Kelas</th>
						<th>Nilai</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{
						responses.map((response, key) => {
							return(
								<tr key={key} >
									<td className="p-2 text-center">{key + 1}</td>
									<td>{response.student}</td>
									<td>{response.class_name}</td>
									<td className="text-center">{response.skor}</td>
									<td className="text-center">
										<button className="badge bg-red">hapus</button>
										<Link to={`/teacher/duty/detail/${duty.id}/response/${response.id}`} className="badge bg-blue">lihat</Link>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</React.Fragment>
	)
}

export default List;
	