import React , {Component} from 'react';
import axios from '../../../../axios.js';
import { Link } from 'react-router-dom';
import illustration from '../../assets/login_illustrasi.svg';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			levels: [],
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// get list levels
		axios.get(`register/level`)
			.then(res => {
				this.setState({ levels: res.data });
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

	handleSubmit(e) {
		e.preventDefault();
		const data = {
			name: this.state.name,
			level_id: this.state.level,
			email: this.state.email,
			password: this.state.password,
			hp: this.state.hp,
			address: this.state.address,
		}
		axios.post(`register/school` , data)
			.then(res => {
				if(res.status === 200) {
					this.props.history.push('/auth/login');
				}
			})
	}

	render() {
		return(
			<section className="flex flex-row text-center">
				<div className="w-1/2">
					<img src={illustration} alt="login" className="w-3/5 m-auto mb-4" />
					<h1 className="text-2xl font-semibold text-gray-800">Bergabung dengan ScevTech</h1>
					<p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit, praesentium. Obcaecati, saepe.</p>
				</div>
				<div className="w-1/2" >
					<h1 className="text-3xl font-semibold uppercase mb-8 text-center" >Daftar</h1>
					<form onSubmit={this.handleSubmit} className="w-full px-12 mb-4" >
						<div className="my-2" >
							<input name="name" onChange={this.handleChange} type="text" placeholder="Nama Sekolah" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
						</div>
						<div className="my-2">
							<select name="level" onChange={this.handleChange} id="level" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600">
								<option value="">-- Pilih Jenjang --</option>
								{
									this.state.levels.map((level , key) => {
										return(
											<option key={key} value={level.id}>{level.level}</option>
										)
									})
								}
							</select>
						</div>
						<div className="my-2" >
							<input name="email" onChange={this.handleChange} type="text" placeholder="Email" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
						</div>
						<div className="flex flex-row gap-2">
							<div className="w-1/2" >
								<input name="password" onChange={this.handleChange} type="password" placeholder="Password" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
							</div>
							<div className="w-1/2" >
								<input name="password_confirmation" onChange={this.handleChange} type="password" placeholder="Konfirmasi Password" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
							</div>
						</div>
						<div className="my-2">
							<input type="text" name="hp" onChange={this.handleChange} placeholder="No.HP"  className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
						</div>
						<div className="my-2">
							<input type="text" name="address" onChange={this.handleChange} placeholder="Alamat"  className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
							</div>
						<button className="bg-gray-600 text-white py-1 px-6 uppercase text-sm font-semibold 
 							rounded-full block m-auto mt-6 transtion duration-200 hover:bg-gray-700">Daftar</button>
					</form>
					<div className="border-t-2 pt-4">
						<p className="text-md text-gray-600">Sudah punya akun? Masuk sekarang.</p>
						<Link to="/auth/login" className="text-gray-600 bg-white py-1 px-6 uppercase text-sm font-semibold rounded-full inline-block m-auto mt-6 transform transition duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md" >Masuk</Link>
					</div>
				</div>
			</section>
		);
	}
}

export default Register;
	