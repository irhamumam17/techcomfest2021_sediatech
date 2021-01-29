import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../axios.js';
import axios2 from 'axios';
import illustration from '../../assets/login_illustrasi.svg';


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: {}
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

	handleSubmit(e) {
		e.preventDefault();
		axios2.get(process.env.REACT_APP_CSRF).then(response => {
			axios.post('/login' , this.state)
				.then(res => {
					if(res.data.response === 'success') {
						let json = {
							id: res.data.id,
							name: res.data.name,
							role: res.data.role,
							token: res.data.token,
						}
						window.sessionStorage.setItem('data_user' , JSON.stringify(json));
						window.sessionStorage.setItem('just_login' , true);
						this.props.history.push(`/${res.data.role}/dashboard`);
					} else {
						this.setState({ error: res.data })
					}
				})
			})
	}

	render() {
		return(
			<section className="flex flex-row text-center">
				<div className="w-1/2">
					<img src={illustration} alt="login" className="w-3/5 m-auto mb-4" />
					<h1 className="text-2xl font-semibold text-gray-800">Bergabung dengan SediaTek</h1>
					<p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit, praesentium. Obcaecati, saepe.</p>
				</div>
				<div className="w-1/2" >
					<h1 className="text-3xl font-semibold uppercase mb-8 text-center" >Login</h1>
					<form onSubmit={this.handleSubmit} className="w-full px-12" >
						<div className="my-2" >
							<input autoFocus={true} type="email" onChange={this.handleChange} name="email" placeholder="Masukkan Email" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
							{
								(this.state.error['email']) ? 
									<span className="invalid-feedback">{this.state.error['email']}</span>
								 : ''
							}
						</div>
						<div className="my-2" >
							<input type="password" onChange={this.handleChange} name="password" placeholder="Masukkan Password" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600" />
							{
								(this.state.error['password']) ? 
									<span className="invalid-feedback">{this.state.error['password']}</span>
								 : ''
							}
						</div>
						<button className="bg-gray-600 text-white py-1 px-6 uppercase text-sm font-semibold 
 rounded-full block m-auto mt-6 transtion duration-200 hover:bg-gray-700 block">Masuk</button>
					</form>
					<div className="my-4 py-4 w-4/5 m-auto border-t-2 border-b-2">
						<a href="https://www.facebook.com" className="block bg-blue-500 text-white py-1 my-2 rounded-full font-semibold transtion duration-200 hover:bg-blue-600">Masuk dengan Facebook</a>
						<a href="https://www.google.com" className="block bg-red-500 text-white py-1 my-2 rounded-full font-semibold transtion duration-200 hover:bg-red-600">Masuk dengan Google</a>
					</div>
					<div>
						<p className="text-md text-gray-600">Masih belum punya akun? Daftar sekarang.</p>
						<Link to="/auth/register" className="text-gray-600 bg-white py-1 px-6 uppercase text-sm font-semibold rounded-full inline-block m-auto mt-6 transform transition duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md" >Daftar</Link>
					</div>
				</div>
			</section>
		);
	}
}

export default Login;
	