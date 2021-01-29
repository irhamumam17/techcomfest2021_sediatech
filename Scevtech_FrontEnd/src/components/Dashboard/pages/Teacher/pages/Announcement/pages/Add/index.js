import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../components/Loading/';
import { AnnouncementContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: '',
			add_loading: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value,
		});

		if(name === 'status') {
			console.log(value);
		}
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ add_loading: true });
		let classesId = [];

		for(let [key , value] of Object.entries(this.state)) {
			console.log(value);
			if(key.includes('class_id_')) {
				let classId = key.replace('class_id_' ,'');
				classId = parseInt(classId);
				classesId.push(classId);
			}
		}
		let newData = {
			title: this.state.title,
			description: this.state.description,
			status: this.state.status,
			classesId: classesId,
		}

		let status = await this.context.addAnnouncement(newData);
		if(status === 200) {
			this.props.history.push('/teacher/announcement/list');
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="bg-white block w-1/3 py-2 px-6 rounded uppercase shadow-md text-pink-400 border-l-4 border-pink-400">
					<h2 className="text-xl font-bold">Buat Pengumuman</h2>
					<h4 className="text-md italic lowercase text-gray-400">
						<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
						<span className="mx-1">/</span>
						<Link to="/teacher/announcement" className="hover:underline hover:text-blue-400">pengumuman </Link> 
					</h4>
				</div>
				<Link to="/teacher/announcement/list" className="button-header">Lihat Pengumuman</Link>
				<form onSubmit={this.handleSubmit} className="card">
					<div className="form-group">
						<label htmlFor="title" className="form-label">Judul</label>
						<input onChange={this.handleChange} name="title" type="text" className="form-input" />
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">Deskripsi</label>
						<textarea onChange={this.handleChange} name="description" id="description" rows="10" className="form-input"></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="status" className="form-group">Status Pengumuman</label>
						<select onChange={this.handleChange} name="status" id="status" className="form-input">
							<option value="">-- Pilih Status --</option>
							<option value="public">Publik</option>
							<option value="teacher">Guru</option>
							<option value="student">Siswa</option>
							<option value="some_class">Kelas Tertentu</option>
						</select>
					</div>
					{
						(this.state.status === 'some_class') ?
							<div className="form-gropu">
								<label htmlFor="class_id" className="form-label">Pilih Kelas</label>
								{
									this.context.classes.map((value , key) => {
										return(
											<div key={key} className="flex flex-row items-center">
												<input type="checkbox" name={`class_id_${value.id}`} onChange={this.handleChange} />
												<span className="ml-2">{value.class_name}</span>
											</div>
										)
									})
								}
							</div>
						: ''
					}
					<button className="button bg-blue">Tambah</button>
					<Loading status={this.state.add_loading} size="large" />
				</form>
			</React.Fragment>
		);
	}
}



Add.contextType = AnnouncementContext;
export default Add;
	