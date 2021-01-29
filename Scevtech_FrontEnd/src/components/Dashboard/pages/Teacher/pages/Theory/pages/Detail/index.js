import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {TheoryContext} from '../../context.js';
import Loading from '../../../../../../components/Loading/';

class Detail extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			loading: true,
			theory: [],
		}
	}

	async componentDidMount() {
		this._isMounted= true;
		let {theory , readStudent} = await this.context.detailTheory(this.state.id);
		if(this._isMounted) {
			this.setState({
				theory: theory.theory,
				readStatus: theory.readStatus,
				readStudent: readStudent,
				loading: false,
			})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Materi</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/theory/list" className="hover:underline hover:text-blue-400">materi </Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/theory/list" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<Link to="teacher/theory/list" className="button-header">Lihat Daftar Materi</Link>
				{
					(this.state.loading) ?
						<Loading size="large" status={this.state.loading} />
					:
						<React.Fragment>
							<div className="flex flex-row gap-4">
								<div className="w-1/3">
									<img src={process.env.REACT_APP_URL+this.state.theory.thumbnail} alt="thumbnail theory" className="card rounded object-cover mr-4" />
								</div>
								<div className="w-2/3">
									<div className="card">
										<div className="flex flex-row">
											<div className="w-1/2">
												<div className="my-2">
													<h3 className="font-semibold">Judul</h3>
													<p>{this.state.theory.title}</p>
												</div>
												<div className="my-2">
													<h3 className="font-semibold">Mata Pelajaran</h3>
													<p>{this.state.theory.subject}</p>
												</div>
												<div className="my-2">
													<h3 className="font-semibold">Waktu Dibuat</h3>
													<p>{this.state.theory.created_at}</p>
												</div>	
												<div className="my-2">
													<h3 className="font-semibold">Status</h3>
													<p>{this.state.theory.status}</p>
												</div>	
											</div>
											<div className="w-1/2">
												<div className="my-2">
													<h3 className="font-semibold">Terbaca</h3>
													<p> {this.state.readStatus.already} dari {this.state.readStatus.total} siswa ({this.state.readStatus.percent}%)</p>
												</div>
												<div className="my-2">
													<h3 className="font-semibold">Kelas</h3>
													<ul>
														{
															this.state.theory.classes.map((value , key) => {
																return(
																	<li key={key}>{value}</li>
																)
															})
														}
													</ul>
												</div>	
											</div>
										</div>
										<div className="my-2">
											<h3 className="font-semibold">Deskripsi</h3>
											<p>{this.state.theory.description}</p>
										</div>
									</div>
									<button onClick={() => this.context.removeTheory(this.state.theory.id)} className="button bg-red">hapus</button>
									<button className="button bg-teal ml-2">Edit</button>
								</div>
							</div>
							<Loading size="small" status={this.context.loading.remove} />
							<table className="table-lg">
								<thead className="bg-indigo-400 text-white">
									<tr>
										<th className="p-2">#</th>
										<th>Nama</th>
										<th>Nis</th>
										<th>Kelas</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.readStudent.map((data , key) => {
											return(
												<tr key={key} >
													<td className="p-2 text-center">{key + 1}</td>
													<td>{data.student}</td>
													<td>{data.nis}</td>
													<td>{data.class_name}</td>
													<td className="text-center">{data.read}</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</React.Fragment>
				}
			</React.Fragment>
		);
	}
}

Detail.contextType = TheoryContext;
export default Detail;
	