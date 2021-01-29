import React , {Component} from 'react';
import axios from '../../../../../../../../axios.js';
import profileImage from '../../../../../../assets/user.jpg';
import Loading from '../../../../../../components/Loading/';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../../../contexts/AuthContext.js';

class Detail extends Component {
	_isMounted = false
	constructor(props) {
		super(props);

		this.state = {
			subject_id: '',
			class_id: '',
			teacher_id: this.props.match.params.id,
			get_teacher: true,
			get_classes: true,
			get_subjects: true,
			get_teacher_subjects: true,
			get_teacher_classes: true,
			add_teacher_subjets: false,
			add_teacher_classes: false,
			del_teacher_subjects: false,
			del_teacher_classes: false,
			teacher: [],
			classes: [],
			subjects: [],
			teacher_subjects: [],
			teacher_classes: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.addSubject   = this.addSubject.bind(this);
		this.addClass     = this.addClass.bind(this);
		this.removeSubject = this.removeSubject.bind(this);
		this.removeClass = this.removeClass.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`school/${this.context.id}/teacher/${this.state.teacher_id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ get_teacher: false , teacher: res.data });
				}
			});
		axios.get(`school/${this.context.id}/subject` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ get_subjects: false, subjects: res.data });
				}
			})
		axios.get(`school/${this.context.id}/class/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ get_classes: false, classes: res.data });
				}
			})
		axios.get(`school/${this.context.id}/teacher/${this.state.teacher_id}/subject/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ get_teacher_subjects: false, teacher_subjects: res.data });
				}
			})
		axios.get(`school/${this.context.id}/teacher/${this.state.teacher_id}/class/list` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ get_teacher_classes: false, teacher_classes: res.data });
				}
			})
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addSubject = (e) => {
		e.preventDefault();
		this.setState({ add_teacher_subjets: true });
		axios.post(`school/${this.context.id}/teacher/${this.state.teacher_id}/subject/add` , { subject_id: this.state.subject_id } , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({ 
					teacher_subjects: [...this.state.teacher_subjects , res.data],
					add_teacher_subjets: false,
				 });
				document.querySelector(`select[name="subject_id"]`).value = '';
			})
	}

	addClass = (e) => {
		e.preventDefault();
		axios.post(`school/${this.context.id}/teacher/${this.state.teacher_id}/class/add` , { class_id: this.state.class_id } , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({
					teacher_classes: [...this.state.teacher_classes , res.data],
					add_teacher_classes: false,
				})
				document.querySelector(`select[name="class_id"]`).value = '';
			})
	}

	removeSubject = (id) => {
		this.setState({ del_teacher_subjects: true });
		axios.delete(`school/${this.context.id}/teacher/${this.state.teacher_id}/subject/${id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({
					del_teacher_subjects: false,
					teacher_subjects: this.state.teacher_subjects.filter(subject => subject.id !== res.data),
				})
			})
	}

	removeClass = (id) => {
		this.setState({ del_teacher_classes: true });
		axios.delete(`school/${this.context.id}/teacher/${this.state.teacher_id}/class/${id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({
					del_teacher_classes: false,
					teacher_classes: this.state.teacher_classes.filter(value => value.id !== res.data),
				})
			})
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Detail Guru</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
						<span className="mx-1">/</span>
						<Link to="/school/teacher/list" className="hover:underline hover:text-blue-400">kelas </Link> 
						<span className="mx-1">/</span>
						<Link to="/school/teacher/list" className="hover:underline hover:text-blue-400">detail </Link> 
					</h4>
				</div>
				<Link to="/school/teacher/list" className="button-header transition duration-200 hover:bg-pink-600">Lihat Daftar Guru</Link>
				{
					(this.state.get_teacher) ?
						<Loading status={this.state.get_teacher} size="large" />
					:
					<div className="flex flex-row gap-4 my-6">
						<div className="w-1/3">
							<div className="card text-center">
								<img src={profileImage} alt="instructor" className="w-3/5 rounded-full m-auto my-4" />
								<h2 className="font-bold text-2xl text-indigo-500">{this.state.teacher.name}</h2>
								<h3 className="font-light text-sm text-gray-500">20 November 2020</h3>
							</div>
							<form onSubmit={this.addSubject} className="card">
							{
								(this.state.get_subjects) ?
									<Loading status={this.state.get_subjects} size="large" />	
								:
									<React.Fragment>
										<div className="my-3">
											<label htmlFor="subject" className="form-label">Tambah Mata Pelajaran</label>
											<select onChange={this.handleChange} name="subject_id" id="subject_id" className="form-input">
												<option value="">-- Pilih Mata Pelajaran --</option>
												{
													this.state.subjects.map((subject , key) => {
														return (
															<option key={key} value={subject.id}>{subject.subject}</option>
														)
													})
												}
											</select>
										</div>
										<button className="button bg-indigo-400">Tambah</button>
										<Loading status={this.state.add_teacher_subjets} size="large" />
									</React.Fragment>
							}
							</form>
							<form onSubmit={this.addClass} className="card">
							{
								(this.state.get_classes) ?
									<Loading status={this.state.get_classes} size="large" />
								:
									<React.Fragment>
										<div className="my-3">
											<label htmlFor="subject" className="form-label">Tambah Kelas</label>
											<select onChange={this.handleChange} name="class_id" id="class_id" className="form-input">
												<option value="">-- Pilih Kelas --</option>
												{
													this.state.classes.map((value , key) => {
														return(
															<option key={key} value={value.id}>{value.class_name}</option>
														)
													})
												}
											</select>
										</div>
										<button className="button bg-blue-400">Tambah</button>
									</React.Fragment>
							}
							</form>
						</div>
						<div className="w-2/3">
							<div className="card">
								<div className="flex flex-row py-2">
									<span className="w-2/5 text-gray-700">Nama</span>
									<span className="w-3/5 text-gray-500">{this.state.teacher.name}</span>
								</div>
								<div className="flex flex-row py-2">
									<span className="w-2/5 text-gray-700">Email</span>
									<span className="w-3/5 text-gray-500">{this.state.teacher.email}</span>
								</div>
								<div className="flex flex-row py-2">
									<span className="w-2/5 text-gray-700">HP</span>
									<span className="w-3/5 text-gray-500">082991828291</span>
								</div>
								<div className="flex flex-row py-2">
									<span className="w-2/5 text-gray-700">Alamat</span>
									<span className="w-3/5 text-gray-500">Gandrungmangu , Cilacap</span>
								</div>
							</div>
							<div className="flex flex-row gap-2">
								<div className="w-1/2">
									<Loading status={this.state.del_teacher_subjects} size="small" />
									{
										(this.state.get_teacher_subjects) ?
											<Loading status={this.state.get_teacher_subjects} size="large" />
										:
											<table className="table-lg">
												<thead className="bg-indigo-400 text-white">
													<tr>
														<th className="p-2">Mata Pelajaran</th>
														<th>Aksi</th>
													</tr>
												</thead>
												<tbody>
													{
														this.state.teacher_subjects.map((subject , key) => {
															return (
																<tr key={key}>
																	<td className="p-2">{subject.subject}</td>
																	<td className="text-center">
																		<button onClick={() => this.removeSubject(subject.id)} className="badge bg-red-400">hapus</button>
																	</td>
																</tr>
															)
														})
													}
												</tbody>
											</table>
									}
								</div>
								<div className="w-1/2">
									<Loading status={this.state.del_teacher_classes} size="small" />

								{
									(this.state.get_teacher_classes) ?
										<Loading status={this.state.get_teacher_classes} size="large" />
									:
									<table className="table-lg">
										<thead className="bg-blue-400  text-white">
											<tr>
												<th className="p-2">Jurusan</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
											{
												this.state.teacher_classes.map((value , key) => {
													return (
														<tr key={key} >
															<td className="p-2">{value.class_name}</td>
															<td className="text-center">
																<button onClick={() => this.removeClass(value.id)} className="badge bg-red-400">hapus</button>
															</td>
														</tr>
													)
												})
											}
										</tbody>
									</table>
								}
								</div>
							</div>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
}

Detail.contextType = AuthContext;
export default Detail;
	