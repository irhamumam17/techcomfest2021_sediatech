import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { JobContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}

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
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		let response = await this.context.addJob(this.state);
		if(response === 200) {
			this.props.history.push('/recruiter/job/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Job</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/recruiter/dashboard" className="hover:underline hover:text-blue-400">rekruiter</Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/list" className="hover:underline hover:text-blue-400">job </Link> 
							<span className="mx-1">/</span>
							<Link to="/recruiter/job/add" className="hover:underline hover:text-blue-400">tambah </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div  
					variants={Variants}
					initial="btnHeadInit"
					animate="btnHeadAnimate"
					transition="btnHeadTransition"
					>
					<Link to="/recruiter/job/list" className="button-header">Daftar Job</Link>
				</motion.div>
				<motion.form onSubmit={this.handleSubmit} className="card"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}
				>
					<div className="flex flex-row gap-4">
						<div className="form-group w-2/3">
							<label htmlFor="position" className="form-label">Posisi</label>
							<input name="position" onChange={this.handleChange} type="text" className="form-input" />
						</div>
						<div className="form-group w-1/3">
							<label htmlFor="deadline" className="form-label">Batas Waktu</label>
							<input name="deadline" onChange={this.handleChange} type="date" className="form-input" />
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="w-1/2 flex flex-row gap-2">
							<div className="form-group w-1/2">
								<label htmlFor="type_time" className="form-label">Waktu Kerja</label>
								<select onChange={this.handleChange} name="type_time" id="type_time" className="form-input">
									<option value="">-- Pilih Opsi --</option>
									<option value="full_time">Full Time</option>
									<option value="part_time">Part Time</option>
								</select>
							</div>
							<div className="form-group w-1/2">
								<label htmlFor="type_distance" className="form-label">Onsite / Remote</label>
								<select onChange={this.handleChange} name="type_distance" id="type_distance" className="form-input">
									<option value="">-- Pilih Opsi --</option>
									<option value="onsite">Onsite</option>
									<option value="remote">Remote</option>
								</select>
							</div>
						</div>
						<div className="w-1/2 flex flex-row gap-2">
							<div className="form-group w-1/2">
								<label onChange={this.handleChange} htmlFor="target" className="form-label">Pengalaman</label>
								<select onChange={this.handleChange} name="target" id="target" className="form-input">
									<option value="">-- Pilih Opsi --</option>
									<option value="fresh_graduate">Fresh Graduate</option>
									<option value="experience">Berpengalaman</option>
								</select>
							</div>
							{
								(this.state.target === 'experience') ?
									<div className="form-group w-1/2">
										<label onChange={this.handleChange} htmlFor="min_experience" className="form-label">Minimal Pengalaman</label>
										<input name="min_experience" onChange={this.handleChange} type="number" className="form-input" placeholder="dalam tahun" />
									</div>
								: ''
							}
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">Deskripsi</label>
						<textarea onChange={this.handleChange} name="description" id="description" rows="10" className="form-input"></textarea>
					</div>
					<button className="button bg-blue">Tambah</button>
				</motion.form>
			</React.Fragment>
		);
	}
}


Add.contextType = JobContext;
export default Add;
	