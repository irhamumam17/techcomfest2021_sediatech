import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import Loading from '../../../../../../components/Loading/';
import { CourseContext } from '../../context.js';
import validate , { Feedback } from '../../../../../../components/Validation/';

class List extends Component {
	static contextType = CourseContext;
	validator = {};
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			acronym: '',
			validate: {
				name: 'required|min:3|max:30',
				acronym: 'required|min:2|max:6',
			},
			labels: {
				name: "Jurusan",
				acronym: "Singkatan",
			},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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

	handleSubmit(e) {
		e.preventDefault();
		// cek validator
		if(Object.keys(this.validator).length === 0) {
			let newCourse = {
				name: this.state.name,
				acronym: this.state.acronym,
			}

			this.context.addCourse(newCourse);
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Daftar Jurusan</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/course/list" className="hover:underline hover:text-blue-400">jurusan</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/course/list" className="hover:underline hover:text-blue-400">daftar </Link> 
						</h4>
					</div>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-3/5">
						{
							(this.context.get_courses) ?
								<div className="mt-5">
									<Loading status={this.context.get_courses} size="large" />
								</div>
							:
								<motion.table className="table-primary w-full"
									variants={Variants}
									initial="cardInit"
									animate="cardAnimate"
									transition={{...Variants.cardTransition , delay: .4}}
								>
									<thead className="bg-indigo-500 text-white">
										<tr>
											<th className="p-2">#</th>
											<th>Jurusan</th>
											<th>Singkatan</th>
											<th>Siswa</th>
											<th>Aksi</th>
										</tr>		
									</thead>
									<tbody>
										{
											this.context.courses.map((course , key ) => {
												let iteration = key + 1;
												return(
													<tr className="text-center" key={key}>
														<td className="p-2">{iteration}</td>
														<td className="text-left">{course.name}</td>
														<td>{course.acronym}</td>
														<td>10 siswa</td>
														<td className="col-badge">
															<Tippy content="hapus" delay={300}>
																<button onClick={() => this.context.removeCourse(course.id)} className="badge-icon bg-red">
																	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																	  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
																	</svg>
																</button>
															</Tippy>
															<Tippy content="hapus" delay={300}>
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
					<div className="w-2/5">
						<motion.form onSubmit={this.handleSubmit} className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .6}}
						>
							<h2 className="text-xl font-bold">Tambah Jurusan</h2>
							<div className="my-4">
								<label className="form-label">Jurusan</label>
								<input type="text" onChange={this.handleChange} placeholder="Ketik Jurusan" name="name" className="form-input" />
								<Feedback text={this.validator['name']} />
							</div>
							<div className="my-4">
								<label className="form-label">Singkatan</label>
								<input type="text" onChange={this.handleChange} placeholder="Ketik Jurusan" name="acronym" className="form-input" />
								<Feedback text={this.validator['acronym']} />
							</div>
							<button className="button bg-blue-400 transition duration-200 hover:bg-blue-500 focus:outline-none">Tambah</button>
						</motion.form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default List;
	