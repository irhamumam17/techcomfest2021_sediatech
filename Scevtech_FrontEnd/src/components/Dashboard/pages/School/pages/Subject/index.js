import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../components/Variants/';
import axios from '../../../../../../axios.js';
import Loading from '../../../../components/Loading/';
import { AuthContext } from '../../../../contexts/AuthContext.js';
import validate , { Feedback } from '../../../../components/Validation/';


class Subject extends React.Component
{
	_isMounted = false;
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			get_subjects: true,
			subjects: [],
			classes: [],
			class_subjects: [],
			subject: '',
			acronym: '',
			del_subject: false,
			add_subject:false,
			validate: {
				name: 'required|min:3|max:30',
				acronym: 'required|min:2|max:8',
			},
			labels: {
				name: 'Nama Mapel',
				acronym: 'Kependekan',
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeSubject = this.removeSubject.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios.get(`school/${this.context.id}/subject` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({
						subjects: res.data,
						get_subjects: false,
					});
				}
			})
		axios.get(`school/${this.context.id}/class/list` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				if(this._isMounted) {
					this.setState({ classes: res.data })
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		if(name.includes('class_id_')) {
			let id = parseInt(name.replace('class_id_' , ''));
			let arr =this.state.class_subjects;
			if(value === true) {
				arr.push(id);
			} else if(value === false) {
				arr = arr.filter(data => data !== id);
			}
			this.setState({
				class_subjects: arr,
			})
		} else {
		    let validation = validate(name , this.state.labels[name] , value , this.state.validate[name]);
			this.validator[name] = validation;
		    if(validation === '') { delete this.validator[name] };
		}

		this.setState({
		  [name]: value,
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		if(Object.keys(this.validator).length === 0) {
			this.setState({ add_subject: true });
			axios.post(`school/${this.context.id}/subject/add` , {
				subject: this.state.name,
				acronym: this.state.acronym,
				classes_id: this.state.class_subjects,
			} , { headers: { Authorization: `Bearer ${this.context.token}` }, }).then(res => {
				let data = res.data;
				this.setState({
					subjects: [...this.state.subjects , { 
						id: data.id,
						subject: data.subject,
						classes: data.classes.length,
						acronym: data.acronym,
					}],
					add_subject: false,
				})
			})
		}
	}

	removeSubject = (id) => {
		this.setState({ del_subject: true });
		axios.delete(`/school/${this.context.id}/subject/${id}` , { headers: { Authorization: `Bearer ${this.context.token}` }, })
			.then(res => {
				this.setState({
					subjects: this.state.subjects.filter(subject => subject.id !== id),
					del_subject: false,
				});
			})
	}

	render() {
		return (
			<React.Fragment>
				<motion.div className="dashboard-title"
					variants={ Variants }
					initial="tInit"
					animate="tAnimate"
					transition="tTransition"
				>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Mata Pelajaran</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/subject" className="hover:underline hover:text-blue-400">mata pelajaran </Link> 
						</h4>
					</div>
				</motion.div>
				<Loading size="small" status={this.state.del_subject} />
				<div className="flex flex-row gap-4">
					<div className="w-2/3">
						{
							(this.state.get_subjects) ?
								<Loading status={this.state.get_subjects} size="large" />
							:
								<motion.table className="table-lg"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .3}}
								>
									<thead className="bg-indigo-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Mata Pelajaran</th>
											<th>Kelas</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										{
											this.state.subjects.map((data , key) => {
												return(
													<tr className="text-center" key={key} >
														<td className="p-2">{key + 1}</td>
														<td className="text-left">{data.subject}</td>
														<td>{data.classes} Kelas</td>
														<td className="col-badge">
															<Tippy content="hapus" delay={300}>
																<button onClick={() => this.removeSubject(data.id)} className="badge-icon bg-red">
																	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																	  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																	</svg>
																</button>
															</Tippy>
															<Tippy content="edit" delay={300}>
																<button className="badge-icon bg-teal">
																	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																	  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
																	  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
																	</svg>
																</button>
															</Tippy>
														</td>
													</tr>
												)
											})
										}
									</tbody>
								</motion.table>
						}
					</div>
					<div className="w-1/3">
						<motion.form onSubmit={this.handleSubmit} className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .5}}
						>
							<h2 className="text-lg font-semibold">Tambah Mata Pelajaran</h2>
							<div className="my-3">
								<label htmlFor="name" className="form-label">Nama Mapel</label>
								<input onChange={this.handleChange} type="text" name="name" className="form-input" />
								<Feedback text={this.validator['name']} />
							</div>
							<div className="my-3">
								<label htmlFor="name" className="form-label">Kependekan</label>
								<input onChange={this.handleChange} type="text" name="acronym" className="form-input" />
								<Feedback text={this.validator['acronym']} />
							</div>
							<div className="my-3">
								<label htmlFor="class_subjects" className="form-label">Kelas</label>
									{
										this.state.classes.map((value , key) => {
											return (
												<div key={key} className="flex flex-row items-center">
													<input type="checkbox" name={`class_id_${value.id}`} onChange={this.handleChange} />
													<span className="ml-2">{value.class_name}</span>
												</div>
											)
										})
									}
							</div>
							<button className="button bg-blue-400 transition duration-200 hover:bg-blue-600">Tambah</button>
							<Loading status={this.state.add_subject} size="large" />
						</motion.form>
					</div>
				</div>
			</React.Fragment>	
		)
	}
}


Subject.contextType = AuthContext;
export default Subject;