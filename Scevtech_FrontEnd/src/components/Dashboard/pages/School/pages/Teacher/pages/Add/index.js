import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { TeacherContext } from '../../context.js';
import validate , { Feedback } from '../../../../../../components/Validation/';

class Add extends Component {
	static contextType = TeacherContext;
	validator={};
	constructor(props) {
		super(props);
	
		this.state = {
			validate: {
				name: 'required|min:3|max:25',
				email: 'required|email',
				password: 'required|min:3|max:30',
				nip: 'required|min:1|max:30',
				phone: 'required|min:3|max:20',
				address: 'required|min:3|max:100',
			},
			labels: {
				name: 'Nama',
				email: 'Email',
				password: 'Password',
				nip: 'NIP',
				phone: 'HP',
				address: 'Alamat',
			},
			name: '',
			nip: '',
			role_id: '',
			email: '',
			password: '',
			phone: '',
			address: '',
			add_loading: false,
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
		if(Object.keys(this.validator).length === 0){
			this.setState({ add_loading: true });
			let response = await this.context.addTeacher({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				role_id: this.state.role_id,
				nip: this.state.nip,
				phone: this.state.phone,
				address: this.state.address,
			});
			
			if(response === 200) {
				this.props.history.push('/school/teacher/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Guru</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/list" className="hover:underline hover:text-blue-400">guru </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/teacher/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/school/teacher/list" className="button-header">Lihat Daftar Guru</Link>
				</motion.div>
				<motion.form className="card" onSubmit={this.handleSubmit} 
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .5}}
				>
					<div className="my-4">
						<label className="form-label">Nama</label>
						<input type="text" name="name" onChange={this.handleChange} placeholder="Ketik Nama Guru" className="form-input " />
						<Feedback text={this.validator['name']} />
					</div>
					<div className="my-4">
						<label className="form-label">Email</label>
						<input type="email" name="email" onChange={this.handleChange} placeholder="Ketik Email Guru" className="form-input " />
						<Feedback text={this.validator['email']} />
					</div>
					<div className="flex flex-row gap-4 -mt-2">
						<div className="my-2 w-1/2">
							<label className="form-label">Password</label>
							<input type="password" name="password" onChange={this.handleChange} placeholder="Ketik Password" className="form-input " />
							<Feedback text={this.validator['password']} />
						</div>
						<div className="my-2 w-1/2">
							<label className="form-label">Konfirmasi Password</label>
							<input type="password" name="password_confirmation" placeholder="Ketik Konfirmasi Password" className="form-input " />
						</div>
					</div>
					<div className="my-4">
						<label className="form-label">Peran</label>
						<select name="role_id" onChange={this.handleChange} id="role_id" className="form-input">
							<option value="">---- Pilih Peran ----</option>
							{
								this.context.roles.map((role , key) => {
									return(
										<option key={key} value={role.id}>{role.name}</option>
									)
								})
							}
						</select>
					</div>
					<div className="my-4">
						<label className="form-label">NIP</label>
						<input type="text" name="nip" onChange={this.handleChange} placeholder="Ketik Nomor Induk Pegawai" className="form-input " />
						<Feedback text={this.validator['nip']} />
					</div>
					<div className="my-4">
						<label className="form-label">Ho.HP</label>
						<input type="text" name="phone" onChange={this.handleChange} placeholder="Ketik Nomor Induk Pegawai" className="form-input " />
						<Feedback text={this.validator['phone']} />
					</div>
					<div className="my-4">
						<label className="form-label">Alamat</label>
						<input type="text" name="address" onChange={this.handleChange} placeholder="Ketik Alamat Guru" className="form-input " />
						<Feedback text={this.validator['address']} />
					</div>
					<button className="button bg-blue">Tambah</button>
					<Loading status={this.state.add_loading} size="large" />
				</motion.form>
			</React.Fragment>
		);
	}
}

export default Add;
	