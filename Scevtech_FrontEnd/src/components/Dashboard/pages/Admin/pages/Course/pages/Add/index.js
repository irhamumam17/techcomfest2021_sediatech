import React , {Component} from 'react';
import { Link } from 'react-router-dom';

import { CourseContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			instructor: '',
		}

		this.handleChange  = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value,
	    });
	}

	handleSubmit(e) {
		e.preventDefault();
		let newId = this.context.courses.length + 1;
		const newCourse = {
			id: newId,
			name: this.state.name,
			instructor: this.state.instructor,
			students: Math.ceil(Math.random() * 100),
		}

		this.context.addCourse(newCourse);
		this.props.history.push('/admin/course/list');
	}

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
						<h2 className="text-xl font-bold">Tambah Kursus</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/list" className="hover:underline hover:text-blue-400">kursus</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/course/add" className="hover:underline hover:text-blue-400">Tambah</Link>
						</h4>
					</div>
				</div>
				<Link to="/admin/course/list" className="button-header transition duration-200 hover:bg-pink-600" >Lihat Daftar Kursus</Link>
				<form onSubmit={this.handleSubmit} className="card w-4/5">
					<div className="my-4">
						<label className="form-label">Nama</label>
						<input type="text" placeholder="Nama" onChange={this.handleChange} name="name" className="form-input focus:shadow-outline focus:outline-none "/>
					</div>
					<div className="my-4">
						<label className="form-label">Instruktur</label>
						<input type="text" placeholder="instruktur" onChange={this.handleChange} name="instructor" className="form-input focus:shadow-outline focus:outline-none "/>
					</div>
					<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
				</form>
			</React.Fragment>
		);
	}
}

Add.contextType = CourseContext;
export default Add;
	