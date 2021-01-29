import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { PaymentContext } from '../../context.js';

class Add extends Component {
	constructor(props) {
		super(props);

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

	async handleSubmit(e) {
		e.preventDefault();
		let status = await this.context.addPayment(this.state);

		if(status === 200) {
			this.props.history.push('/teacher/payment/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Pembayaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/list" className="hover:underline hover:text-blue-400">pembayaran </Link>
							<span className="mx-1">/</span>
							<Link to="/teacher/payment/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/teacher/payment/list" className="button-header">
						Daftar Pembayaran
					</Link>
				</motion.div>
				<form onSubmit={this.handleSubmit} className="card">
					<div className="form-group">
						<label htmlFor="class_id" className="form-label">Pilih Kelas</label>
						<select onChange={this.handleChange} name="class_id" id="class_id" className="form-input">
							<option value="">-- Pilih Kelas -- </option>
							{
								this.context.classes.map((value , key) => {
									return(
										<option key={key} value={value.id}>{value.class_name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="name" className="form-label">Nama</label>
						<input onChange={this.handleChange} name="name" type="text" className="form-input" />
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">Deskripsi</label>
						<textarea onChange={this.handleChange} name="description" id="description" rows="5" className="form-input"></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="value" className="form-label">Pembayaran</label>
						<input onChange={this.handleChange} name="value" type="number" className="form-input" min="0" />
					</div>
					<button className="button bg-blue-400">Tambah</button>
				</form>
			</React.Fragment>
		);
	}
}


Add.contextType = PaymentContext;
export default Add;
	