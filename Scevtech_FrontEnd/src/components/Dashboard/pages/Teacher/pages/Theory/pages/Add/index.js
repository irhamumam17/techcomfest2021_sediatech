import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { TheoryContext } from '../../context.js';
import thumbnail from '../../../../../../assets/theory.jpg';
import validate , { Feedback } from '../../../../../../components/Validation/';

class Add extends Component {
	validator = {};
	constructor(props) {
		super(props);
	
		this.state = {
			validate: {
				title: 'required|min:3|max:20',
				description: 'requireed|min:4|max:100',
			},
			labels: {
				title: 'Judul',
				description: 'Deskripsi',
			},
			title: '',
			subject_id: '',
			description: '',
			created_at: '',
			status: 'publish',
			files: {},
			list_files: [],
		}


		this.handleChange = this.handleChange.bind(this);
		this.handleCover = this.handleCover.bind(this);
		this.handleDocument  = this.handleDocument.bind(this);
		this.handleUrl = this.handleUrl.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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

	handleCover = (event) => {
		let cover = event.target.files;
		this.setState({
			files: {...this.state.files , cover},
		})
	}

	handleDocument = (event) => {
		let document = event.target.files;
		this.setState({
			files: {...this.state.files , document },
		})
	}

	handleUrl = (event) => {
		const target = event.target;
		let url = target.value;
		this.setState({ files: {...this.state.files , url} });
	}  


	handleUpload = async  (e) => {
		e.preventDefault();
		let listFiles = await this.context.uploadFile(this.state.files);
		this.setState({
			list_files: listFiles,
		});
		console.log(this.state);
	}

	async handleSubmit(e) {
		e.preventDefault();
		let classesId = [];
		for(let [key , value] of Object.entries(this.state)) {
			console.log(value);
			if(key.includes('class_id_')) {
				let classId = key.replace('class_id_' ,'');
				classId = parseInt(classId);
				classesId.push(classId);
			}
		}
		let newTheory = {
			subject_id: this.state.subject_id,
			title: this.state.title,
			description: this.state.description,
			status: this.state.status,
			classes_id: classesId,
			list_files: this.state.list_files,
		};
		if(Object.keys(this.validator).length === 0) {
			let status = await this.context.addTheory(newTheory);
			if(status === 200) {
				this.props.history.push('/teacher/theory/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Materi</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/theory/list" className="hover:underline hover:text-blue-400">materi </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/theory/add" className="hover:underline hover:text-blue-400">tambah </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
					<motion.form onSubmit={this.handleSubmit} encType="multipart/form-data" className="w-2/3 card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .2}}
						>
						<h2 className="text-xl font-bold">Form Input</h2>
						<div className="form-group">
							<label htmlFor="title" className="form-label">Judul</label>
							<input type="text" id="title" onChange={this.handleChange} name="title" className="form-input " />
							<Feedback text={this.validator['title']} />
						</div>
						<div className="form-group">
							<label htmlFor="subject_id" className="form-label">Mata Pelajaran</label>
								{
									(this.context.loading.subjects) ?
									<Loading status={this.context.loading.subjects} size="large" />
									:
									<select name="subject_id" id="subject_id" className="form-input" onChange={this.handleChange}>
										<option value="">-- Pilih Mata Pelajaran --</option>
										{
											this.context.teacher.subjects.map((subject , key) => {
												return (
													<option key={key} value={subject.id}>{subject.subject}</option>
												)
											})
										}
									</select>
								}
						</div>
						<div className="form-group">
							<label htmlFor="class_id" className="form-label">Pilih Kelas</label>
							{
								(this.context.loading.classes) ?
								<Loading status={this.context.loading.classes} size="large" />
								:
								this.context.teacher.classes.map((value , key) => {
									return (
										<div key={key} className="flex flex-row items-center">
											<input type="checkbox" name={`class_id_${value.id}`} onChange={this.handleChange} />
											<span className="ml-2">{value.class_name}</span>
										</div>		
									)
								})
							}
						</div>
						<div className="form-group">
							<label htmlFor="description" className="form-label">Deskripsi</label>
							<input type="text" id="description" onChange={this.handleChange} name="description" className="form-input " />
							<Feedback text={this.validator['description']} />
						</div>
						<div className="form-group">
							<label htmlFor="status" className="form-label">Status</label>
							<select name="status" className="form-input"  onChange={this.handleChange} id="status">
								<option value="publish">Publish</option>
								<option value="draft">Draft</option>
							</select>
						</div>
						<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
					</motion.form>
					<motion.form onSubmit={this.handleUpload} className="w-1/3 card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .5}}
						>
						<div className="my-3">
							<label htmlFor="thumbnail" className="form-label">Thumbnail / Cover</label>
							<img src={thumbnail} alt="thumbnail theory" className="h-48 rounded my-4" />
							<input onChange={this.handleCover} type="file" accept=".jpg,.jpeg,.png" className="form-input hover:cursor-pointer" />
							<div id="progress-cover">

							</div>
						</div>
						<div className="my-3">
							<label htmlFor="file" className="form-label">File Dokumen</label>
							<input type="file" multiple={true} name="file" onChange={this.handleDocument} className="form-input" />
							<div id="progress-document">
								
							</div>
						</div>
						<div className="my-3">
							<label htmlFor="Embed" className="form-label">Embed Url</label>
							<input type="url" onChange={this.handleUrl} name="embed" className="form-input" />
						</div>
						<button className="button bg-teal-400">Upload</button>
					</motion.form>
				</div>
			</React.Fragment>
		);
	}
}

Add.contextType = TheoryContext;
export default Add;
	