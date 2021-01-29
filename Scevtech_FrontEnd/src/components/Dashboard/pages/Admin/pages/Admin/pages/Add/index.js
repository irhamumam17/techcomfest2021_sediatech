import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { AdminContext } from '../../context.js';
import validate , { Feedback } from '../../../../../../components/Validation/';
import Loading from '../../../../../../components/Loading/';


class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			loading: false,
			validate: {
				name: 'required|min:3|max:25',
				email: 'required|email',
				password: 'required|min:3|max:30',
			},
			labels: {
				name: 'Nama',
				email: 'Email',
				password: 'Kata Sandi',
			},
			errors: {},
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	async handleSubmit(e) {
		e.preventDefault();
		// cek validator;
		if(Object.keys(this.validator).length === 0) {
			this.setState({loading: true});
			const newAdmin = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			}

			let status = await this.context.addAdmin(newAdmin);
			if(status === 200) {
				this.props.props.history.push('/admin/admin/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Admin</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/admin/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/admin/admin/list" className="button-header" >Lihat Daftar Admin</Link>
				</motion.div>
				<motion.form onSubmit={this.handleSubmit} className="w-4/5 bg-white my-4 p-6 rounded shadow-lg"
					variants={Variants}
					initial="cardInit"
					animate="cardAnimate"
					transition={{...Variants.cardTransition , delay: .2}}
				>
					<div className="my-4">
						<input type="text" onChange={this.handleChange} placeholder="Nama" autoFocus={true} name="name" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600"/>
						<Feedback text={this.validator['name']} />
					</div>
					<div className="my-4">
						<input type="email" onChange={this.handleChange} placeholder="Email" name="email" className="py-2 px-4 rounded shadow-xs focus:shadow-outline focus:outline-none w-full text-gray-600"/>
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
					<button type="submit" className="text-white bg-blue-400 font-bold uppercase py-2 px-6 rounded mt-4 transtion duration-200 hover:bg-blue-500">Tambah</button>
					<Loading status={this.state.loading} size="large" />
				</motion.form>
			</React.Fragment>
		);
	}
}

Add.contextType = AdminContext;
export default Add;
	