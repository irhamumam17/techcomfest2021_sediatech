import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { ScholarshipContext } from '../../context.js';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import validate , { Feedback } from '../../../../../../components/Validation/';

class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			cover: '',
			cover_uploaded: false,
			validate: {
				title: 'required|min:3|max:30',
				date: 'required',
				time: 'required',
				limit: 'required|min:1|max:10',
				institution: 'required|min:3|max:30',
				description: 'required|min:5|max:600',
			},
			labels: {
				title: 'Judul',
				date: 'Tanggal',
				time:'Waktu',
				limit: 'Kuota',
				institution: 'Lembaga',
				description: 'Deskripsi',
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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

	handleFile(event) {
		this.setState({
			cover: event.target.files[0],
		})
	}

	handleUpload = async(e) =>  {
		e.preventDefault();
		let response = await this.context.uploadCover(this.state.cover);
		this.setState({
			cover: response,
			cover_uploaded: true,
		})
	}

	handleSubmit = async (e) =>  {
		e.preventDefault();
		// cek validator
		if(Object.keys(this.validator).length === 0) {
			console.log(this.state);
			let deadline = this.state.date + ' ' + this.state.time + ':00';
			console.log(deadline);
			let response = await this.context.addScholarship({
				cover: this.state.cover,
				title: this.state.title,
				deadline: deadline,
				limit: this.state.limit,
				institution: this.state.institution,
				description: this.state.description,
			});

			if(response === 200) {
				this.props.history.push('/admin/scholarship/list');
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
						<h2 className="text-xl font-bold">Tambah Beasiswa</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/admin/dashboard" className="hover:underline hover:text-blue-400">Admin</Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/scholarship/list" className="hover:underline hover:text-blue-400">beasiswa </Link> 
							<span className="mx-1">/</span>
							<Link to="/admin/scholarship/add" className="hover:underline hover:text-blue-400">tambah </Link> 
						</h4>
					</div>
				</motion.div>
				<motion.div
							variants={Variants}
							initial="btnHeadInit"
							animate="btnHeadAnimate"
							transition="btnHeadTransition"
							className="inline-block">
					<Link to="/admin/scholarship/list" className="button-header" >Daftar Beasiswa</Link>
				</motion.div>

				<div className="flex flex-col md:flex-row gap-4">
					<motion.form onSubmit={this.handleSubmit} className="w-2/3 card"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .2}}
					>
						<div className="form-group">
							<label htmlFor="title" className="form-label">Judul</label>
							<input type="text" name="title" onChange={this.handleChange} className="form-input" />
							<Feedback text={this.validator['title']} />
						</div>
						<div className="form-group">
							<label htmlFor="deadline" className="form-label">Batas Waktu</label>
							<div className="flex flex-row gap-2">
								<div className="w-1/2">
									<input type="date" name="date" onChange={this.handleChange} className="form-input w-full" />
									<Feedback text={this.validator['date']} />
								</div>
								<div className="w-1/2">
									<input type="time" name="time" onChange={this.handleChange} className="form-input w-full" />
									<Feedback text={this.validator['time']} />
								</div>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="limit" className="form-label">Kuota</label>
							<input type="number" name="limit" onChange={this.handleChange} className="form-input" />
							<Feedback text={this.validator['limit']} />
						</div>
						<div className="form-group">
							<label htmlFor="institution" className="form-label">Lembaga</label>
							<input type="text" name="institution" onChange={this.handleChange} className="form-input" />
							<Feedback text={this.validator['institution']} />
						</div>
						<div className="form-group">
							<label htmlFor="description" className="form-label">Deskripsi</label>
							<textarea name="description" onChange={this.handleChange} id="description" rows="4" className="form-input"></textarea>
							<Feedback text={this.validator['description']} />
						</div>
						<button className="button bg-blue">Tambah</button>
					</motion.form>
					<motion.form onSubmit={this.handleUpload} className="card w-1/3" encType="multipart/form-data"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .4}}
					>
						{
							(this.state.cover_uploaded) ?
								<img src={process.env.REACT_APP_URL + 'storage/scholarship/covers/' + this.state.cover} alt="cover" />
							:''
						}
						<div className="form-group">
							<label htmlFor="cover" className="form-label">Cover</label>
							<input type="file" accept=".jpg,.png,jpeg" className="form-input" name="cover" onChange={this.handleFile} />
						</div>
						<button className="button bg-indigo">Upload</button> 
						<div id="progress-cover">
						</div>
					</motion.form>
				</div>
			</React.Fragment>
		);
	}
}


Add.contextType = ScholarshipContext;
export default Add;
	