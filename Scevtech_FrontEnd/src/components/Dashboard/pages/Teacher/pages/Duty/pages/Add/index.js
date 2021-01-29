import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { DutyContext } from '../../context.js';
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
				date: 'required',
				time: 'required',
			},
			labels: {
				title: 'Judul',
				description: 'Deskripsi',
				date: 'Tanggal',
				time: 'Waktu',
			},
			title: '',
			subject_id: '',
			date: '',
			time: '',
			description: '',
			created_at: '',
			status: 'waiting',
			files: {},
			list_files: [],
		}


		this.handleChange   = this.handleChange.bind(this);
		this.handleCover    = this.handleCover.bind(this);
		this.handleDocument = this.handleDocument.bind(this);
		this.handleUrl      = this.handleUrl.bind(this);
		this.handleSubmit   = this.handleSubmit.bind(this);
		this.handleUpload   = this.handleUpload.bind(this);
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
	}

	async handleSubmit(e) {
		e.preventDefault();
		let deadline = this.state.date + ' ' + this.state.time + ':00';
		let classesId = [];
		for(let [key , value] of Object.entries(this.state)) {
			if(key.includes('class_id_')) {
				let classId = key.replace('class_id_' ,'');
				console.log(value);
				classId = parseInt(classId);
				classesId.push(classId);
			}
		}
		let newDuty = {
			subject_id: this.state.subject_id,
			title: this.state.title,
			description: this.state.description,
			status: this.state.status,
			classes_id: classesId,
			list_files: this.state.list_files,
			deadline: deadline,
		};
		if(Object.keys(this.validator).length === 0){
			let status = await this.context.addDuty(newDuty);
			if(status === 200) {
				this.props.history.push('/teacher/duty/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/teacher/dashboard" className="hover:underline hover:text-blue-400">guru</Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/duty/list" className="hover:underline hover:text-blue-400">tugas </Link> 
							<span className="mx-1">/</span>
							<Link to="/teacher/duty/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/teacher/duty/list" className="button-header">Lihat Daftar Tugas</Link>
				</motion.div>
				<motion.div className="flex flex-row gap-4"
						variants={Variants}
						initial="cardInit"
						animate="cardAnimate"
						transition={{...Variants.cardTransition , delay: .4}}
					>
					<form onSubmit={this.handleSubmit} encType="multipart/form-data" className="w-2/3 card">
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
						<div className="my-2 gap-2">
							<label htmlFor="deadline" className="form-label">Batas Akhir</label>
							<div className="flex flex-row">
								<div className="w-1/2">
									<input type="date" name="date" className="form-input" onChange={this.handleChange} />
									<Feedback text={this.validator['date']} />
								</div>
								<div className="w-1/2">
									<input type="time" name="time" className="form-input" onChange={this.handleChange} />
									<Feedback text={this.validator['time']} />
								</div>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="description" className="form-label">Deskripsi</label>
							<input type="text" id="description" onChange={this.handleChange} name="description" className="form-input " />
							<Feedback text={this.validator['description']} />
						</div>
						<div className="form-group">
							<label htmlFor="status" className="form-label">Status</label>
							<select name="status" className="form-input"  onChange={this.handleChange} id="status">
								<option value="waiting">Publish</option>
								<option value="draft">Draft</option>
							</select>
						</div>
						<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500">Tambah</button>
					</form>
					<form onSubmit={this.handleUpload} className="w-1/3 card">
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
					</form>
				</motion.div>
			</React.Fragment>
		);
	}
}

Add.contextType = DutyContext;
export default Add;
	