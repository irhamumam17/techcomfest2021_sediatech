import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { RecruiterContext } from '../../context.js';
import validate , { Feedback } from '../../../../../../components/Validation/';

class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			validate: {
				name: 'required|min:3|max:25',
				email: 'required|email',
				password: 'required|min:3|max:30',
				phone: 'required|min:3|max:20',
				company: 'required|min:3|max:25',
			},
			labels: {
				name: 'Nama',
				email: 'Email',
				password: 'Kata Sandi',
				phone: "HP",
				company: 'Perusahaan',
			},
		}

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

	handleSubmit = async (e) => {
		e.preventDefault();
		if(Object.keys(this.validator).length === 0) {
			let {name , email , password ,phone , company} = this.state;
			let response = await this.context.addRecruiter({name , email , password , phone , company});
			if(response === 200) {
				this.props.props.history.push('/admin/recruiter/list');
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
						  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
						  <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Rekruiter</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/recruiter/add" className="hover:underline hover:text-blue-400">Instruktur </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/recruiter/add" className="hover:underline hover:text-blue-400">Tambah </Link> 
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
					<Link to="/admin/recruiter/list" className="button-header" >Lihat Daftar Rekruiter</Link>
				</motion.div>
				<motion.form onSubmit={this.handleSubmit} className="w-4/5 bg-white my-4 p-6 rounded shadow-lg"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}
					>
					<div className="form-group">
						<label htmlFor="name" className="form-label">Nama</label>
						<input onChange={this.handleChange} name="name"  type="text" className="form-input" />
						<Feedback text={this.validator.name} />
					</div>
					<div className="form-group">
						<label htmlFor="email" className="form-label">Email</label>
						<input onChange={this.handleChange} name="email"  type="email" className="form-input" />
						<Feedback text={this.validator.email} />
					</div>
					<div className="flex flex-row gap-4 -mt-2">
						<div className="my-2 w-1/2">
							<label htmlFor="password" className="form-label">Password</label>
							<input  onChange={this.handleChange} name="password" type="password" className="form-input" />
							<Feedback text={this.validator.password} />
						</div>
						<div className="my-2 w-1/2">
							<label htmlFor="password_confirmation" className="form-label">Konfirmasi Password</label>
							<input type="password" className="form-input" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="phone" className="form-label">No.HP</label>
						<input onChange={this.handleChange} name="phone" type="tel" className="form-input" />
						<Feedback text={this.validator.phone} />
					</div>
					<div className="form-group">
						<label htmlFor="company" className="form-label">Perusahaan</label>
						<input onChange={this.handleChange} name="company" type="text" className="form-input" />
						<Feedback text={this.validator.company} />
					</div>
					<button className="text-white bg-blue-400 font-bold uppercase py-2 px-6 rounded mt-4 transtion duration-200 hover:bg-blue-500">Tambah</button>
				</motion.form>
			</React.Fragment>
		);
	}
}

Add.contextType = RecruiterContext;
export default Add;
	