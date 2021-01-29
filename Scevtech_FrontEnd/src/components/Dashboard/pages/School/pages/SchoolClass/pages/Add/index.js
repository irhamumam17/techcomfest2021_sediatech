import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Variants from '../../../../../../components/Variants/';
import { ClassContext } from '../../context.js';
import Loading from '../../../../../../components/Loading/'

class Add extends Component {
	constructor(props) {
		super(props);

		this.state = {
			level_id: '',
			sub_id: '',
			course_id: '',
			new_level: '',
			new_sub_class: '',
			new_level_loading: false,
			new_sub_class_loading: false,
			new_class_loading: false,
		}

		this.handleChange = this.handleChange.bind(this);
		this.submitLevel  = this.submitLevel.bind(this);
		this.submitSub    = this.submitSub.bind(this);
		this.submitClass  = this.submitClass.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		
		this.setState({
		  [name]: value,
		});
	}

	async submitLevel(e) {
		e.preventDefault();
		this.setState({new_level_loading: true});
		let response = await this.context.addLevel({ name: this.state.new_level });
		if(response === 200) {
			this.setState({ new_level_loading: false , new_level: '' });
			document.querySelector('input[name="new_level"]').value = '';
		}
	}

	async submitSub(e) {
		e.preventDefault();
		this.setState({new_sub_class_loading: true});
		let response = await this.context.addSubClasses({ name: this.state.new_sub_class });
		if(response === 200) {
			this.setState({ new_sub_class_loading: false , new_sub_class: '' });
			document.querySelector('input[name="new_sub_class"]').value = '';
		}
	}

	async submitClass(e) {
		e.preventDefault();
		this.setState({ new_class_loading: true });
		let newClass = {
			level_id: this.state.level_id,
			sub_id: this.state.sub_id,
			course_id: this.state.course_id,
		};
		let response = await this.context.addClass(newClass);
		if(response === 200) {
			this.props.history.push('/school/class/list');
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
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
						</svg>
					</div>
					<div>
						<h2 className="text-xl font-bold">Tambah Kelas</h2>
						<h4 className="text-md italic lowercase text-gray-400">
							<Link to="/school/dashboard" className="hover:underline hover:text-blue-400">Sekolah</Link> 
							<span className="mx-1">/</span>
							<Link to="/school/class/list" className="hover:underline hover:text-blue-400">kelas </Link> 
							<span className="mx-1">/</span>
							<Link to="/school/class/add" className="hover:underline hover:text-blue-400">tambah </Link> 
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
					<Link to="/school/class/list" className="button-header" >Daftar Kelas</Link>
				</motion.div>
				<div className="flex flex-row gap-4">
					<div className="w-3/5">
						<motion.form onSubmit={this.submitClass} className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .2}}
						>
							<h2>Tambah Kelas</h2>
							<div className="my-2">
								<label className="form-label">Tingkat</label>
								<select onChange={this.handleChange} name="level_id" id="grade_id" className="form-input">
									<option value="">-- pilih tingkat --</option>
									{
										this.context.levels.map((level , key) => {
											return (
												<option key={key} value={level.id}>{level.name}</option>
											)
										})
									}
								</select>
							</div>
							<div className="my-2">
								<label className="form-label">Sub Kelas</label>
								<select onChange={this.handleChange} name="sub_id" id="sub_class_id" className="form-input">
									<option value="">-- pilih sub kelas --</option>
									{
										this.context.sub_classes.map((sub , key) => {
											return (
												<option key={key} value={sub.id} > {sub.name} </option>
											)
										})
									}
								</select>
							</div>
							<div className="my-2">
								<label className="form-label">Jurusan</label>
								<select onChange={this.handleChange} name="course_id" id="course_id" className="form-input">
									<option value="">-- pilih jurusan --</option>
									{
										this.context.courses.map((course , key) => {
											return (
												<option key={key} value={course.id} >{course.name}</option>
											)
										})
									}
								</select>
							</div>
							<button className="button bg-blue-400 transtion duration-200 hover:bg-blue-500">Tambah</button>
						</motion.form>
						<Loading status={this.state.new_class_loading} size="large" />
					</div>
					<div className="w-2/5">
						<motion.form onSubmit={this.submitLevel} className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .4}}
						>
							<h2>Tambah Tingkat</h2>
							<div className="my-2">
								<input type="text" name="new_level" onChange={this.handleChange} placeholder="Masukkan Tingkat" className="form-input" />
							</div>
							<button className="button bg-blue-400 transtion duration-200 hover:bg-blue-500">Tambah</button>
							<Loading status={this.state.new_level_loading} size="large" />
						</motion.form>
						<motion.form onSubmit={this.submitSub} className="card"
							variants={Variants}
							initial="cardInit"
							animate="cardAnimate"
							transition={{...Variants.cardTransition , delay: .6}}
						>
							<h2>Tambah Sub Kelas</h2>
							<div className="my-2">
								<input type="text" name="new_sub_class" onChange={this.handleChange} placeholder="Masukkan Sub Kelas" className="form-input" />
							</div>
							<button className="button bg-blue-400 transtion duration-200 hover:bg-blue-500">Tambah</button>
							<Loading status={this.state.new_sub_class_loading} size="large" />
						</motion.form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Add.contextType = ClassContext;
export default Add;
	