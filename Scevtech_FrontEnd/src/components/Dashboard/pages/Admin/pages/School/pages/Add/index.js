import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import {SchoolContext} from '../../context.js';
import Loading from '../../../../../../components/Loading/';
import validate , { Feedback } from '../../../../../../components/Validation/';



class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			level: '',
			name: '',
			email: '',
			password:'',
			level_id: 1,
			address: '',
			phone: '',
			hp: '',
			headmaster: '',
			loading: false,
			validate: {
				name: 'required|min:4|max:25',
				level_id: 'required',
				email: 'required|email',
				password: 'required|min:3|max:30',
				headmaster: 'required|min:4|max:25',
				address: 'required|min:3|max:100',
				hp: 'required|min:3|max:20',
				phone: 'required|min:3|max:20',
				level: 'required|min:2|max:7',
			},
			labels: {
				name: 'Nama',
				level_id: 'Jenjang',
				email: 'Email',
				password: 'Password',
				headmaster: 'Kepala Sekolah',
				address: 'Alamat',
				hp: 'HP',
				phone: 'Telephone',
				level: 'Jenjang',
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.submitGrade = this.submitGrade.bind(this);
		this.submitSchool = this.submitSchool.bind(this);
	}

	handleChange(event) {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    let validation = validate(name , this.state.labels[name] , value , this.state.validate[name]);
	    this.setState({
	      [name]: value,
	    });
	    this.validator[name] = validation;
	    if(validation === '') { delete this.validator[name] };
	}


	submitGrade(e) {
		e.preventDefault();
		if(Object.keys(this.validator).length === 0) {
			let newGrade = {
				level: this.state.level,
			}
			this.context.addGrade(newGrade);
			document.querySelector('input[name="level"]').value = '';
		}
	}

	async submitSchool(e) {
		e.preventDefault();
		// cek validator
		if(Object.keys(this.validator).length === 0) {
			this.setState({loading: true});
			let newSchool = {
				name: this.state.name,
				teacher: Math.ceil(Math.random() * 10),
				student: Math.ceil(Math.random() * 200),
				status: 'nonactive',
				email: this.state.email,
				level_id: this.state.level_id,
				password: this.state.password,
				address: this.state.address,
				phone: this.state.phone,
				hp: this.state.hp,
				headmaster: this.state.headmaster,
			}
			let response = await this.context.addSchool(newSchool);
			if(response === 200) {
				this.props.props.props.history.push('/admin/school/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Sekolah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/school" className="hover:underline hover:text-blue-400">admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/list" className="hover:underline hover:text-blue-400">sekolah </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/school/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/admin/school/list" className="button-header" >Lihat Daftar Sekolah</Link>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-3/5">
						<motion.form onSubmit={this.submitSchool} className="w-full bg-white my-4 p-6 rounded shadow-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .2}}
						>
							<div className="my-4">
								<label className="form-label">Nama</label>
								<input type="text" name="name" onChange={this.handleChange} placeholder="Nama" className="form-input"/>
								<Feedback text={this.validator.name} />
							</div>
							<div className="my-4">
								<label className="form-label">Jenjang</label>
								<select name="level_id" onChange={this.handleChange} className="form-input">
									{this.context.grades.map(grade => {
										return (
											<option key={grade.id} value={grade.id}>{grade.level}</option>
										)
									})}
								</select>
								<Feedback text={this.validator.level} />
							</div>
							<div className="my-4">
								<label className="form-label">Email</label>
								<input type="email" name="email" onChange={this.handleChange} placeholder="Email" className="form-input"/>
								<Feedback text={this.validator.email} />
							</div>
							<div className="flex flex-row gap-4 -mt-2">
								<div className="my-2 w-1/2">
									<label className="form-label">Password</label>
									<input type="password" name="password" onChange={this.handleChange} placeholder="Password" className="form-input"/>
									<Feedback text={this.validator.password} />
								</div>
								<div className="my-2 w-1/2">
									<label className="form-label">Konfirmasi Password</label>
									<input type="password" name="password_confirmation" placeholder="Konfirmasi Password" className="form-input"/>
								</div>
							</div>
							<div className="my-4">
								<label className="form-label">Kepala Sekolah</label>
								<input type="text" name="headmaster" onChange={this.handleChange} placeholder="Alamat" className="form-input"/>
								<Feedback text={this.validator.headmaster} />
							</div>
							<div className="my-4">
								<label className="form-label">Alamat</label>
								<input type="text" name="address" onChange={this.handleChange} placeholder="Alamat" className="form-input"/>
								<Feedback text={this.validator.address} />
							</div>
							<div className="my-4">
								<label className="form-label">No. Hp</label>
								<input type="number" name="hp" onChange={this.handleChange} placeholder="No.Hp" className="form-input"/>
								<Feedback text={this.validator.hp} />
							</div>
							<div className="my-4">
								<label className="form-label">Telephone</label>
								<input type="number" name="phone" onChange={this.handleChange} placeholder="No.Hp" className="form-input"/>
								<Feedback text={this.validator.phone} />
							</div>
							<button className="text-white bg-blue-400 font-bold uppercase py-2 px-6 rounded mt-4 transition duration-200 hover:bg-blue-500">Tambah</button>
							<Loading status={this.state.loading} size="large" />
						</motion.form>
					</div>
					<div className="w-2/5">
						<motion.form action="" onSubmit={this.submitGrade} className="w-full bg-white my-4 p-6 rounded shadow-lg"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .4}}
						>
							<h2>Tambah Jenjang</h2>
							<div className="my-4">
								<label className="form-label">Jenjang</label>
								<input type="text" name="level" onChange={this.handleChange} className="form-input"/>
								<Feedback text={this.validator.level} />
							</div>
							<button type="submit" className="text-white bg-blue-400 font-bold uppercase py-2 px-6 rounded mt-4 transtion duration-200 hover:bg-blue-500">Tambah</button>
						</motion.form>
						<motion.table className="w-full bg-white rounded shadow-lg overflow-hidden"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .6}}
						>
							<thead className="bg-indigo-500 text-white">
								<tr>
									<th className="p-2">#</th>
									<th>Jenjang</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{this.context.grades.map((grade , key) => {
									let iteration = key + 1;
									return(
										<tr key={iteration}>
											<td className="p-2 text-center">{iteration}</td>
											<td>{grade.level}</td>
											<td className="text-center">
												<button onClick={() => this.context.removeGrade(grade.id)} className="bg-red-400 text-white pb-1 px-4 text-sm font-bold rounded mx-1">hapus</button>
												<button className="bg-teal-400 text-white pb-1 px-4 text-sm font-bold rounded mx-1">edit</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</motion.table>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Add.contextType = SchoolContext;
export default Add;
	