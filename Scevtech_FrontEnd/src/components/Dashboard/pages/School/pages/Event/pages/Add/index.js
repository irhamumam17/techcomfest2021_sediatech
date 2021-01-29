import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { EventContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url_image: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		if(name === 'image') {
			let image = target.files[0];
			this.setState({ image });
		} else {
			this.setState({
			  [name]: value,
			});
		}
	}

	handleUpload = async(e) => {
		e.preventDefault();
		let response = await this.context.uploadImage(this.state.image);
		if(response) {
			this.setState({ url_image: response });
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		let data = {
			image: this.state.url_image,
			name: this.state.name,
			location: this.state.location,
			date: this.state.date + ' ' + this.state.time + ':00',
			description: this.state.description,
			status: this.state.status,
		}

		let response = await this.context.addEvent(data);
		if(response === 200) {
			this.props.history.push('/school/event/school');
		}
 	}

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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/event/school" className="hover:underline hover:text-blue-400">event </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/event/add" className="hover:underline hover:text-blue-400">tambah </Link> 
						</h4> 
					</div>
				</motion.div>
				<motion.div
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					className="inline-block"
				>
					<Link to="/school/event/school" className="button-header">Lihat Event Sekolah</Link>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-1/2">
						<form onSubmit={this.handleSubmit} className="card">
							<div className="form-group">
								<label htmlFor="name" className="form-label">Nama Event</label>
								<input onChange={this.handleChange} name="name" type="text" className="form-input" />
							</div>
							<div className="form-group">
								<label htmlFor="status" className="form-label">Status Event</label>
								<select onChange={this.handleChange} name="status" id="status" className="form-input">
									<option value="">-- Pilih Status --</option>
									<option value="school">Sekolah</option>
									<option value="public">Umum</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="location" className="form-label">Lokasi</label>
								<input onChange={this.handleChange} name="location" type="text" className="form-input" />
							</div>
							<div className="form-group">
								<label htmlFor="date" className="form-label">Waktu Pelaksanaan</label>
								<div className="flex flex-row gap-2">
									<input onChange={this.handleChange} name="date" type="date" className="w-1/2" />
									<input onChange={this.handleChange} name="time" type="time" className="w-1/2" />
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="description" className="form-label">Deskripsi</label>
								<textarea onChange={this.handleChange} name="description" id="description" rows="5" className="form-input"></textarea>
							</div>
							<button className="button bg-blue">Tambah</button>
						</form>
					</div>
					<div className="w-1/2">
						<form encType="multipart/form-data" onSubmit={this.handleUpload} className="card">
							{
								(this.state.url_image !== '') ?
									<img src={process.env.REACT_APP_URL + `storage/event/images/${this.state.url_image}`} alt="image" />
								: ''
							}
							<div className="form-group">
								<label htmlFor="image" className="form-label">Gambar</label>
								<input type="file" onChange={this.handleChange} className="form-input" name="image" />
								<div id="progress-image"></div>
							</div>
							<button className="button bg-teal">Upload</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


Add.contextType = EventContext;
export default Add;
	