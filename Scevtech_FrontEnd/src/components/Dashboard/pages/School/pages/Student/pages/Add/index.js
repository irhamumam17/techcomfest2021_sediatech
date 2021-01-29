import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import {StudentContext} from '../../context.js';
import validate , { Feedback } from '../../../../../../components/Validation/';

class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);
	
		this.state = {
			validate: {
				name: 'required|min:3|max:25',
				email: 'required|email',
				password: 'required|min:3|max:30',
				nis: 'required|min:1|max:10',
				phone: 'required|min:3|max:20',
				address: 'required|min:3|max:100',
			},
			labels: {
				name: 'Nama',
				email: 'Email',
				password: 'Password',
				nis: 'NIS',
				phone: 'HP',
				address: 'Alamat',
			},
			name: '',
			email: '',
			password: '',
			class_id: '',
			gender: '',
			nis: '',
			phone: '',
			address: '',
		}
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		if(Object.keys(this.state.validate).includes(name)) {
		    let validation = validate(name , this.state.labels[name] , value , this.state.validate[name]);
			this.validator[name] = validation;
		    if(validation === '') { delete this.validator[name] };
		}
		this.setState({
		  [name]: value,
		});

	}

	async handleSubmit(e) {
		e.preventDefault();

		if(Object.keys(this.validator).length === 0) {
			let newStudent = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				class_id: this.state.class_id,
				gender: this.state.gender,
				nis: this.state.nis,
				phone: this.state.phone,
				address: this.state.address,
			}	

			let response = await this.context.addStudent(newStudent);
			if(response === 200) {
				this.props.history.push('/school/student/list');
			}
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Siswa</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/student/list" className="hover:underline hover:text-blue-400">siswa </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/student/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/school/student/list" className="button-header">Lihat Daftar Siswa</Link>
				</motion.div>
				<motion.form className="card" onSubmit={this.handleSubmit} 
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .5}}
				>
					<div className="my-4">
						<label className="form-label">Nama</label>
						<input type="text" name="name" autoFocus={true} autoComplete="name" onChange={this.handleChange} placeholder="Ketik Nama Siswa" className="form-input focus:outline-none focus:shadow-outline" />
						<Feedback text={this.validator['name']} />
					</div>
					<div className="my-4">
						<label className="form-label">Email</label>
						<input type="email" name="email" autoComplete="email" onChange={this.handleChange} placeholder="Ketik Email Siswa" className="form-input focus:outline-none focus:shadow-outline" />
						<Feedback text={this.validator['email']} />
					</div>
					<div className="flex flex-row gap-4 -mt-2">
						<div className="my-2 w-1/2">
							<input type="password" onChange={this.handleChange} name="password" placeholder="Password" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600"/>
							<Feedback text={this.validator['password']} />
						</div>
						<div className="my-2 w-1/2">
							<input type="password" placeholder="Konfirmasi Passowrd" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600"/>
						</div>
					</div>
					<div className="my-4">
						<label className="form-label">Kelas</label>
						<select name="class_id" id="class_id" onChange={this.handleChange} className="form-input">
							<option value="">---- Pilih Kelas ----</option>
							{
								this.context.classes.map((value , key) => {
									return (
										<option key={key} value={value.id} >{value.class_name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="my-4">
						<label className="form-label">Jenis Kelamin</label>
						<select name="gender" id="gender" onChange={this.handleChange} className="form-input">
							<option value="">--- Pilih Jenis Kelamin ---</option>
							<option value="male">Laki-Laki</option>
							<option value="female">Perempuan</option>
						</select>
					</div>
					<div className="my-4">
						<label className="form-label">NIS</label>
						<input type="text" name="nis" autoComplete="nis" onChange={this.handleChange} placeholder="Ketik Nomor Induk Siswa" className="form-input focus:outline-none focus:shadow-outline" />
						<Feedback text={this.validator['nis']} />
					</div>
					<div className="my-4">
						<label className="form-label">No.Hp</label>
						<input type="text" name="phone" autoComplete="phone" onChange={this.handleChange} placeholder="Ketik Nomor Induk Siswa" className="form-input focus:outline-none focus:shadow-outline" />
						<Feedback text={this.validator['phone']} />
					</div>
					<div className="my-4">
						<label className="form-label">Alamat</label>
						<input type="text" name="address" autoComplete="address" onChange={this.handleChange} placeholder="Ketik Alamat Siswa" className="form-input focus:outline-none focus:shadow-outline" />
						<Feedback text={this.validator['address']} />
					</div>
					<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500 focus:outline-none">Tambah</button>
				</motion.form>
			</React.Fragment>
		);
	}
}

Add.contextType = StudentContext;
export default Add;
	